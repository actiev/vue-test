<template>
    <v-app id="inspire" class="container">
        <h1 class="text-center" v-if="this.edit">Редактировать сотрудника</h1>
        <h1 class="text-center" v-else>Добавить сотрудника</h1>
        <form>
            <v-text-field
                    v-validate="'required|max:50'"
                    v-model="firstName"
                    :counter="50"
                    :error-messages="errors.collect('firstName')"
                    label="Имя"
                    data-vv-name="firstName"
                    required
            ></v-text-field>
            <v-text-field
                    v-validate="'required|max:50'"
                    v-model="secondName"
                    :counter="50"
                    :error-messages="errors.collect('secondName')"
                    label="Фамилия"
                    data-vv-name="secondName"
                    required
            ></v-text-field>
            <v-text-field
                    v-validate="'required|min:10'"
                    v-model="phone"
                    :error-messages="errors.collect('phone')"
                    label="Телефон"
                    mask="0##########"
                    data-vv-name="phone"
                    return-masked-value
                    required
            ></v-text-field>
            <v-text-field
                    v-validate="'required|email'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    label="E-mail"
                    data-vv-name="email"
                    required
            ></v-text-field>
            <v-text-field
                    v-validate="'required|max:20'"
                    v-model="skype"
                    :counter="20"
                    :error-messages="errors.collect('skype')"
                    label="Скайп"
                    data-vv-name="skype"
                    required
            ></v-text-field>
            <v-text-field
                    v-model="comment"
                    :counter="50"
                    :error-messages="errors.collect('comment')"
                    label="Комментарий"
                    data-vv-name="comment"
            ></v-text-field>

            <v-btn @click="submit" v-if="this.edit">Изменить</v-btn>
            <v-btn @click="submit" v-else>Добавить</v-btn>
            <v-btn @click="clear">очистить</v-btn>
        </form>
    </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['edit'],
  name: 'UserForm',
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    skype: '',
    comment: '',
    dictionary: {
      attributes: {
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        firstName: {
          required: () => 'fistName can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        },
        secondName: {
          required: () => 'secondName can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        }
      }
    }
  }),
  computed: {
    ...mapState({
      user: 'user'
    })
  },
  mounted () {
    this.$validator.localize('ru', this.dictionary)
    if (this.user) {
      this.firstName = this.user.firstName
      this.secondName = this.user.secondName
      this.email = this.user.email
      this.phone = this.user.phone
      this.skype = this.user.skype
      this.comment = this.user.comment
    }
  },
  methods: {
    submit () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          return
        }
        let user = {
          id: this.user ? this.user.id : new Date().getTime(),
          firstName: this.firstName,
          secondName: this.secondName,
          email: this.email,
          phone: this.phone,
          skype: this.skype,
          comment: this.comment,
          telegram: this.phone,
          departID: this.user ? this.user.departID : this.$route.params.id
        }
        this.edit === true
          ? this.$store.dispatch('editUser', {id: user.id, data: user})
          : this.$store.dispatch('addUser', user)
        this.$router.push({path: `/`})
      })
    },
    clear () {
      this.firstName = ''
      this.secondName = ''
      this.email = ''
      this.phone = ''
      this.skype = ''
      this.comment = ''
      this.$validator.reset()
    }
  },
  created () {
    if (this.edit === true) {
      this.$store.dispatch('loadById', this.$route.params.id)
        .catch(() => {
          this.$router.push({name: 'Page404'})
        })
    } else {
      this.$store.dispatch('loadById', null)
    }
  }
}
</script>
