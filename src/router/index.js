import Vue from 'vue'
import Router from 'vue-router'
import UsersList from '@/components/UsersList'
import UserForm from '@/components/UserForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UsersList',
      component: UsersList
    },
    {
      path: '/depart/:id(\\d+)',
      name: 'AddForm',
      component: UserForm
    },
    {
      path: '/edit/:id(\\d+)',
      name: 'EditForm',
      component: UserForm,
      props: {edit: true}
    }
  ]
})
