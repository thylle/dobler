import Vue from 'vue'
import router from 'vue-router'

//Components
import home from '@/components/home'
import group from '@/components/group'
import page404 from '@/components/page404'

Vue.use(router)

//TODO add fallback page for invalid pages or 404

const pageRouter = new router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/:name/:id',
      name: 'group',
      component: group
    },
    {
      path: '*',
      name: 'page404',
      component: page404
    },
  ]
});

export default pageRouter