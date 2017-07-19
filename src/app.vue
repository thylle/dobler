<template>
  <div id="app">
    <div class="container">
      <header class="header">
        <a class="header__logo" href="/">LOGO</a>
  
        <div class="header__user" v-if="isReady">
          <div>{{user.User}}</div>
        </div>
  
        <div class="header__actions">
          <button id="show-modal" v-show="!isAuthorized" @click="showModal = true">Log ind</button>
          <button class="" v-show="isAuthorized" @click="logout()">log out </button>
        </div>
      </header>
  
      <main id="content">
        <signup v-if="!isAuthorized"></signup>
  
        <div v-if="isAuthorized">
          <router-view v-if="isReady" :user="user" :selectedOdds="selectedOdds"></router-view>
        </div>
      </main>
  
      <footer>
        <p>footer</p>
      </footer>
    </div>
  
    <modal v-if="showModal" @close="showModal = false">
      <p slot="header">Log ind</p>
      <div slot="body">
        <p>Du kan vælge at logge ind med Facebook eller Google+</p>
  
        <button class="btn--auth btn--facebook" v-show="!isAuthorized" @click="login('facebook')">Log ind med Facebook</button>
        <button class="btn--auth btn--google" v-show="!isAuthorized" @click="login('google')">Log ind med Google+</button>
      </div>
    </modal>
  
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import hello from 'hellojs/dist/hello.all.js';
import signup from './components/signup.vue'
import modal from './components/modal.vue'

//Init hello.js with authenticate id's
hello.init({
  facebook: "284488928624542",
  google: "865110950434-9vfa5kpheflfm3rh2cvga3ieuia26ppk.apps.googleusercontent.com"
}, {
    scope: 'email',
    display: 'popup',
    redirect_uri: 'http://localhost:8080/'
  }
);

export default {
  name: 'app',
  data() {
    return {
      isReady: false,
      isAuthorized: false,
      authProvider: null,
      user: null,
      selectedOdds: [],
      showModal: false
    }
  },
  components: {
    signup,
    modal
  },

  created() {
    this.$Progress.start()
    this.validateAuthorization();

    //beforeRouteEnter
    //beforeRouteUpdate (added in 2.2)
    //beforeRouteLeave
    
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },

  methods: {
    done() {
      setTimeout(() => {
        this.$Progress.finish()
        this.isReady = true
      }, 300);
    },
    //Init Home is only called if the user is authenticated.
    initHome() {
      this.showModal = false;
      this.getUserData();
    },
    resetUserInfo() {
      this.user = [];
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

        //Get user data from database - if the user does not exists, the backend will create a new user for us.
        this.$http.get('http://doblerapi.dev/api/user/getUserData', { params: userInfo })
          .then(result => {
            let userData = result.body;
            console.log("user data: ", userData);

            if (userData) {
              this.user = userData;
            }

            this.done();
          })
      }, e => {
        console.log('Cant get user data... ', e.error.message);
      });
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
        this.authProvider = null;
        this.validateAuthorization();
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
    validateAuthorization() {
      let googleAuth = hello('google').getAuthResponse();
      let facebookAuth = hello('facebook').getAuthResponse();

      if (this.checkAuthSession(googleAuth) || this.checkAuthSession(facebookAuth)) {
        this.isAuthorized = true;
        this.initHome();
        return true;
      }
      else {
        this.isAuthorized = false;
        this.resetUserInfo();
        this.done();
        return false;
      }
    }
  }
}
</script>


<style lang="scss">
@import './resources/master.scss';
</style>
