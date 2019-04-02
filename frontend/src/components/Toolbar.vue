<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Форум</v-toolbar-title>
    <v-spacer></v-spacer>

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
export default {
    name: 'TOOLbar',
    data() {
      return {
        items: [
          {title: 'Forum', to:'/forum', show:true},
          {title: 'Login', to:'/login', show: !User.loggedIn()},
          {title: 'Ask question', to:'/ask', show: User.loggedIn()},
          {title: 'Category', to:'/category', show: User.loggedIn()},
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