<template>
  <v-toolbar color="indigo" dark z-index="2" data-app>

    <div class="hidden-md-and-up">

          <v-menu bottom left z-index="223" >
            <template v-slot:activator="{ on }">
              <v-btn  dark icon  v-on="on" >
                <v-icon>more_vert</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i"  v-show="item.show">
                <v-list-item-title>
                        <v-btn text>
                            <v-btn icon><v-icon>{{ item.icon }}</v-icon></v-btn>
                            {{ item.title }}
                        </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

    </div>

    <v-toolbar-title class="white--text">
            <v-icon >nature_people</v-icon> Форум
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <app-notification v-if="loggedIn"/>

    <div class="hidden-sm-and-down">
        <v-btn text v-for="item in items" :key="item.title" v-show="item.show" :to="item.to" @click="!item.to?logout():''">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
    </div>

  </v-toolbar>
</template>

<script>

import AppNotification from './AppNotification'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'TOOLbar',
    components: {AppNotification},
    data() {
      return { }
    },
    computed: {
        ...mapGetters([
            'login/loggedIn',
            'toolbar/items'
        ]),
        items() {
            return this['toolbar/items']
        },
        loggedIn() {
            return this['login/loggedIn'];
        }
    },
    methods: {
        ...mapActions([
            'login/logout'
        ]),
        logout(){
            console.log('login/logout')
            this['login/logout']();
        }
    }
}
</script>
<!--
<style lang="scss" scoped>
.v-list__tile__title {
    /*overflow: inherit;*/
        overflow: unset;
}
.v-menu__content {
    overflow: unset;
}
</style>
<style>
.v-list__tile {
    top: -18px !important   ;
}
</style>
-->
