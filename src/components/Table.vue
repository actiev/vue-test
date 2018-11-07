<template>
    <v-data-table
            :headers="headers"
            :items="usersList"
            hide-actions
            class="elevation-1"
    >
        <template slot="items" slot-scope="props">
            <td>{{ props.item.firstName }}</td>
            <td>{{ props.item.secondName }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.skype }}</td>
            <td>{{ props.item.telegram }}</td>
            <td>{{ props.item.comment }}</td>
            <td>
                <v-btn color="info" @click="editUser(props.item.id)">Редактировать</v-btn>
                <v-btn color="error" @click="removeUser(props.item.id)">Удалить</v-btn>
            </td>
        </template>
    </v-data-table>
</template>

<script>
export default {
  name: 'Table',
  props: ['users', 'depart'],
  data () {
    return {
      headers: [
        {text: 'Имя', value: 'firstName'},
        {text: 'Фамилия', value: 'secondName'},
        {text: 'Телефон', value: 'phone', sortable: false},
        {text: 'Почта', value: 'email', sortable: false},
        {text: 'Скайп', value: 'skype', sortable: false},
        {text: 'Телеграмм', value: 'telegram', sortable: false},
        {text: 'Комментарий', value: 'comment', sortable: false},
        {text: 'Действие', value: 'action', sortable: false}
      ]
    }
  },
  computed: {
    usersList: function () {
      return this.users.filter(user => parseInt(user.departID) === parseInt(this.depart))
    }
  },
  methods: {
    editUser: function (id) {
      this.$router.push({path: `/edit/${id}`})
    },
    removeUser: function (id) {
      this.$store.dispatch('removeUser', {id})
    }
  }
}
</script>
