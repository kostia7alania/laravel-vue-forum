<template>
  <v-toolbar color="indigo" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
        <router-link class="white--text" to="/">Форум</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <app-notification v-if="loggedIn"/>

    <div class="hidden-sm-and-down">



    <router-link
      v-for="item in items"
      :key="item.title"
      v-show="item.show"
      :to="item.to">
      <v-btn flat><v-btn icon><v-icon>{{ item.icon }}</v-icon></v-btn>{{ item.title }}</v-btn>
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
          {title: 'Forum', to:'/forum', icon:'question_answer',  show:true},
          {title: 'Login', to:'/login', icon: 'person', show: !User.loggedIn()},
          {title: 'Ask question', to:'/ask', icon: 'plus_one',show: User.loggedIn()},
          {title: 'Category', to:'/category', icon: 'bookmarks', show:  User.loggedIn() && User.admin()},
          {title: 'Logout', to:'/Logout', icon: 'exit_to_app', show: User.loggedIn()},
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
