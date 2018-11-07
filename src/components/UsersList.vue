<template>
  <div class="container-fluid">
    <v-app id="inspire">
      <div>
        <v-toolbar color="cyan" dark tabs>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Сотрудники</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-tabs
            slot="extension"
            v-model="currentItem"
            color="transparent"
            fixed-tabs
            slider-color="yellow"
          >
            <v-tab
              v-for="item in departments"
              :href="'#tab-' + item.id"
              :key="item.id"
            >
              {{ item.title }}
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="currentItem">
          <v-tab-item
                  v-for="depart in departments"
                  :value="'tab-' + depart.id"
                  :key="depart.id"
          >
            <v-card flat>
              <Table :users="users" :depart="depart.id"></Table>
            </v-card>
            <div class="mt-4">
              <v-btn
                      fab
                      dark
                      color="green"
                      absolute
                      right
                      @click="addUser(depart.id)"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Table from './Table'
export default {
  name: 'UserList',
  components: {Table},
  data: () => ({
    currentItem: `tab-1`
  }),
  computed: {
    ...mapState({
      departments: 'departments',
      users: 'users'
    })
  },
  methods: {
    addUser: function (id) {
      this.$router.push({path: `/depart/${id}`})
    }
  }
}
</script>
