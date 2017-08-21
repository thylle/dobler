import Vue from 'vue'
import router from 'vue-router'

//Components
import home from '@/components/home'
import test from '@/components/test'
import group from '@/components/group/group'
import createGroup from '@/components/group/createGroup'
import groupsOverview from '@/components/group/groupsOverview'
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
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/:name/:id',
      name: 'group',
      component: group
    },
    {
      path: '/opret-gruppe',
      name: 'createGroup',
      component: createGroup
    },
    {
      path: '/find-gruppe',
      name: 'groupsOverview',
      component: groupsOverview
    },
    {
      path: '*',
      name: 'page404',
      component: page404
    },
  ]
});

export default pageRouter