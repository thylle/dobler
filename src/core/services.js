import Vue from 'vue'
import VueResource from 'vue-resource'
import Config from '../config';
import Store from '../store';
Vue.use(VueResource);
Vue.http.options.root = Config.apiUrl;


export default {
  
  //Get user data from database - if the user does not exists, the backend will create a new user for us.
  //******

  //TODO Make it return a promise for the store action to process

  //******
  getUserData(userInfo) {
    Vue.http.get('data/getUserData', {params: userInfo})
      .then(result => {
        let user = result.body;

        if (user) {
          Store.dispatch("updateUser", {user})
        }
      })
      .catch((err) => console.error(err));
  }
}
