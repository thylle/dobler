import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource);

export default new Vuex.Store({
  state: {
    user: [],
    groups: [],
  },
  mutations: {
    GET_USER(state, user) {
      state.user = user;
      console.log("store, get current user: ", state.user);
    },

    //Group Mutations
    GET_ALL_GROUPS(state, groups){

      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];

        //Check if the user is already a member of this group
        if (state.user.Groups.filter(function (e) { return e.Id == group.Id; }).length > 0) {
          group.UserIsMember = true;
        }
      }

      state.groups = groups;
      console.log("store, get all groups: ", state.groups);
    },

    JOIN_GROUP(state, group){
      state.user.Groups.push(group);
      console.log("store, join group", group);
    },

    LEAVE_GROUP(state, group){
      state.user.Groups = state.user.Groups.filter(function(el) {
        return el.Id !== group.Id;
      });
      console.log("store, leave group", group);
    }
  },

  actions: {
    getUser({commit}, {user}){
      commit('GET_USER', user)
    },

    //Group Actions
    //Get all groups in the system
    //**TODO Performance when getting EVERYTHING???
    // Paging and filtering/search
    getAllGroups({commit}){
      Vue.http
        .get('data/getAllGroups')
        .then(response => {
          commit('GET_ALL_GROUPS', response.body)
        })
        .catch((err) => console.error(err));
    },

    joinGroup({commit}, {group}){
      commit('JOIN_GROUP', group)
    },
    leaveGroup({commit}, {group}){
      commit('LEAVE_GROUP', group)
    },
  },

  getters: {
    user: state => state.user,
    groups: state => state.groups,

    //EXAMPLE OF HOW TO ONLY RETURN FILTERED ITEMS BASED ON A BOOL
    // todos: state => state.todos.filter((todo) => {
    //   return !todo.completed
    // }),
  }
})
