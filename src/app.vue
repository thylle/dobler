<template>
  <div id="app">
    <header class="header">
      <router-link class="header__logo" to="/">
        <img src="./assets/dobler-logo.svg" height="34" alt="Dobler Logo" />
      </router-link>
      
      <div class="header__user" v-if="currentUser">
        {{currentUser.User.Name}}
      </div>
  
      <div class="header__actions">
        <a href="/catalog">catalog</a>
        <button v-show="!isAuthorized" @click="showModal = true" v-lang.generic.login></button>
        <button v-show="isAuthorized" @click="logout()" v-lang.generic.logout></button>
      </div>
    </header>
  
    <div class="container">
      <div v-if="loading">
        <h2 class="mt2">Loading...</h2>
      </div>

      <main id="content" v-if="!loading">
        <landingpage v-if="!isAuthorized"></landingpage>
  
        <!-- The Router View  -->
        <router-view v-if="isAuthorized && currentUser"></router-view>
      </main>
  
      <footer>
        <p>footer</p>
      </footer>
    </div>
  
    <modal v-if="showModal" @close="showModal = false">
      <p slot="header" v-lang.generic.login></p>
      <div slot="body">
        <p v-lang.generic.loginDesc></p>
  
        <button class="btn--auth btn--facebook" v-show="!isAuthorized" @click="login('facebook')" v-lang.generic.loginWithFacebook></button>
        <button class="btn--auth btn--google" v-show="!isAuthorized" @click="login('google')" v-lang.generic.loginWithGoogle></button>
      </div>
    </modal>
  
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Config from './config';
import Services from './core/services';
import hello from 'hellojs/dist/hello.all.js';
import landingpage from './components/landingpage.vue'
import modal from './components/modal.vue'

//Init hello.js with authenticate id's
hello.init({
  facebook: "284488928624542",
  google: "865110950434-9vfa5kpheflfm3rh2cvga3ieuia26ppk.apps.googleusercontent.com"
}, {
    scope: 'email',
    display: 'popup',
    redirect_uri: Config.authRedirectUri
  }
);

export default {
  name: 'app',
  data() {
    return {
      isAuthorized: false,
      authProvider: null,
      showModal: false
    }
  },
  components: {
    landingpage,
    modal
  },

  created() {
    //this.$Progress.start()
    this.validateAuthorization();

    //beforeRouteEnter
    //beforeRouteUpdate (added in 2.2)
    //beforeRouteLeave

    //  hook the progress bar to start before we move router-view
    // this.$router.beforeEach((to, from, next) => {
    //   //  does the page we want to go to have a meta.progress object
    //   if (to.meta.progress !== undefined) {
    //     let meta = to.meta.progress
    //     this.$Progress.parseMeta(meta)
    //   }
    //   this.$Progress.start()
    //   //  continue to next page
    //   next()
    // })

    //  hook the progress bar to finish after we've finished moving router-view
    // this.$router.afterEach((to, from) => {
    //   this.$Progress.finish()
    // })
  },
  computed:{
    currentUser(){
      return this.$store.state.user;
    },
    loading(){
      return this.$store.state.loading;
    }
  },
  methods: {
    
    //Init Home is only called if the user is authenticated.
    initHome() {
      this.getUserData();
      this.showModal = false;
    },

    resetUserInfo() {
      this.$store.dispatch("resetUser");
      this.showModal = false;
    },

    getUserData() {
      //Get user data from auth provider
      hello(this.authProvider).api('me').then(response => {
        console.log("auth me: ", response);

        let userInfo = {
          name: response.first_name + " " + response.last_name,
          email: response.email
        }

        //Get user data from the database
        Services.getUserData(userInfo);

      }, e => {
        alert('Cant get user data... ' + e.error.message);
      });
    },

    validateAuthorization() {
      let googleAuth = hello('google').getAuthResponse();
      let facebookAuth = hello('facebook').getAuthResponse();

      if (this.checkAuthSession(googleAuth) || this.checkAuthSession(facebookAuth)) {
        this.isAuthorized = true;
        this.initHome();
      }
      else {
        this.isAuthorized = false;
        this.resetUserInfo();
      }
    },

    //Authentication From Here -----
    login(provider) {
      hello(provider).login().then(response => {
        this.authProvider = provider;
        console.log("Logged in....");
        this.validateAuthorization();
      }, e => {
        console.log('login error: ' + e.error.message);
        this.validateAuthorization();
      });
    },

    logout() {
      hello(this.authProvider).logout().then(response => {
        window.location.href = "/";
        console.log("signed out....");
      }, e => {
        console.log('logout error: ' + e.error.message);
        this.validateAuthorization();
      });
    },

    checkAuthSession(session) {
      if (session) {
        this.authProvider = session.network;
        let currentTime = (new Date()).getTime() / 1000;
        return session && session.access_token && session.expires > currentTime;
      }

      return false;
    },
  }
}
</script>

<style lang="scss">
@import './resources/master.scss';
</style>
