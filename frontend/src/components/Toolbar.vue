<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Форум</v-toolbar-title>
    <v-spacer></v-spacer>

    <app-notification v-if="loggedIn"/>

    <div class="hidden-sm-and-down">

    <router-link
      v-for="item in items"
      :key="item.title"
      v-show="item.show"
      :to="item.to">
      <v-btn flat>{{ item.title }}</v-btn>
    </router-link>

    </div>

  </v-toolbar>
</template>

<script>
import AppNotification from './AppNotification'
export default {
    name: 'TOOLbar',
    components: {AppNotification},
    data() {
      return {
          loggedIn: User.loggedIn(),
        items: [
          {title: 'Forum', to:'/forum', show:true},
          {title: 'Login', to:'/login', show: !User.loggedIn()},
          {title: 'Ask question', to:'/ask', show: User.loggedIn()},
          {title: 'Category', to:'/category', show:  User.loggedIn() && User.admin()},
          {title: 'Logout', to:'/Logout', show: User.loggedIn()},
        ]
      }
    },
    created() {
      EventBus.$on('logout', () => {
        User.logout()
      })
    }
}
</script>
