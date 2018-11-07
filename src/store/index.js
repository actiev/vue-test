import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  state: {
    user: {},
    users: [
      {
        id: 1,
        firstName: 'Alex',
        secondName: 'Ivanov',
        phone: '4234234332',
        email: 'test@gmail.com',
        skype: 'test',
        telegram: 'test',
        comment: 'Comment',
        departID: 1
      },
      {
        id: 2,
        firstName: 'Petr',
        secondName: 'Petrovich',
        phone: '4234234332',
        email: 'test@gmail.com',
        skype: 'test',
        telegram: 'test',
        comment: 'Comment',
        departID: 2
      },
      {
        id: 3,
        firstName: 'Oleg',
        secondName: 'Sidorov',
        phone: '4234234332',
        email: 'test@gmail.com',
        skype: 'test',
        telegram: 'test',
        comment: 'Comment',
        departID: 2
      },
      {
        id: 4,
        firstName: 'Elena',
        secondName: 'Alexandrovna',
        phone: '4234234332',
        email: 'test@gmail.com',
        skype: 'test',
        telegram: 'test',
        comment: 'Comment',
        departID: 3
      }
    ],
    departments: [
      {
        id: 1,
        title: 'разработка'
      },
      {
        id: 2,
        title: 'тестирование'
      },
      {
        id: 3,
        title: 'маркетинг'
      },
      {
        id: 4,
        title: 'HR'
      },
      {
        id: 5,
        title: 'бухгалтерия'
      }
    ]
  },
  mutations: {
    removeUserFromList (state, payload) {
      state.users = state.users.filter(user => parseInt(user.id) !== parseInt(payload))
    },
    addUserInList (state, payload) {
      state.users = state.users.concat(payload)
    },
    editUserFromList (state, payload) {
      state.users = [
        ...state.users.filter(user => user.id !== payload.id),
        payload.data
      ]
    },
    getUserById (state, payload) {
      state.user = state.users.find(user => parseInt(user.id) === parseInt(payload))
    }
  },
  actions: {
    removeUser (context, params) {
      context.commit('removeUserFromList', params.id)
    },
    editUser (context, params) {
      context.commit('editUserFromList', params)
    },
    addUser (context, params) {
      context.commit('addUserInList', params)
    },
    loadById (context, params) {
      context.commit('getUserById', params)
    }
  }
})

export default Store
