<template>
  <v-toolbar color="indigo" dark z-index="2" data-app>

    <div class="hidden-md-and-up">

          <v-menu bottom left z-index="223" >
            <template v-slot:activator="{ on }">
              <v-btn  dark icon  v-on="on" >
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i" v-show="item.show" :to="item.to"  @click="manuClickHandler(item.title)" >
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
            <v-icon>nature_people</v-icon> Форум
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <app-notification v-if="loggedIn"/>

    <div class="hidden-sm-and-down">
        <v-btn :ripple="false" text v-for="item in items" :key="item.title" v-show="item.show" :to="item.to"  @click="manuClickHandler(item.title)">
            <v-icon>{{ item.icon }}</v-icon>
            {{ item.title }}
        </v-btn>
    </div>


  <div class="text-xs-center">
    <v-dialog v-model="modal" width="500" >
      <!--
          <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on"> <v-icon>person</v-icon> Войти </v-btn>
      </template-->

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title >
            <v-icon>{{  !regMode ? 'person' : 'assignment' }}</v-icon>
          {{ !regMode ? 'Форма входа' : 'Форма регистрации'}}
        </v-card-title>

        <v-card-text v-if="modal">
            <LoginVue  v-if="!regMode" @toRegMode="regMode=true"/>
            <SignupVue v-else @toLoginMode="regMode=false"/>
        </v-card-text>

      </v-card>
    </v-dialog>
  </div>




  </v-toolbar>
</template>

<script>

import AppNotification from './AppNotification'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import LoginVue from './login/Login.vue';
import SignupVue from './login/Signup.vue';

export default {
    name: 'TOOLbar',
    components: {AppNotification,LoginVue, SignupVue },
    data() {
      return {
          regMode:false,
      }
    },
    computed: {
        ...mapState([
//            'toolbar/modalMode'
        ]),
        ...mapGetters([
            'login/loggedIn',
            'toolbar/items'
        ]),
        modal:{
            get(){
                return this.$store.state.toolbar.modalMode
            },
            set(e){

                if(e)   this['toolbar/SET_MODAL_MODE_ON']()
                else    this['toolbar/SET_MODAL_MODE_OFF']()
            }
        },
        items() {
            return this['toolbar/items']
        },
        loggedIn() {
            return this['login/loggedIn'];
        }
    },
    methods: {
        ...mapMutations([
            'toolbar/SET_MODAL_MODE_ON',
            'toolbar/SET_MODAL_MODE_OFF',
        ]),
        ...mapActions([
            'login/logout'
        ]),
        manuClickHandler(title) {

            if(title=='Выйти') this.logout();
            if(title=='Войти') {
                this['toolbar/SET_MODAL_MODE_ON']();
            }

        },
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
