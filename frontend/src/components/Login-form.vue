<template>
    <div class="text-xs-center">
        <v-dialog v-model="modal" class="text-xs-center" width="500" :persistent="persistent">
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
                <LoginVue  v-if="!regMode" @toRegMode=" regMode=true"/>
                <SignupVue v-else @toLoginMode=" regMode=false"/>
            </v-card-text>
        </v-card>
        </v-dialog>
     </div>
</template>

<script>

import { mapMutations, mapGetters, mapState } from 'vuex'
import LoginVue from './login/Login.vue';
import SignupVue from './login/Signup.vue';

export default {
    name: 'login-form',
    components: {LoginVue, SignupVue },
    data() {
      return {
          regMode:false,
      }
    },
    computed: {
        persistent() {
            return this.$store.state.global._snack
        },
        modal: {
            get() {
                return this.$store.state.toolbar.modalMode
            },
            set(e) {
                if(e)   this['toolbar/SET_MODAL_MODE_ON']()
                else    this['toolbar/SET_MODAL_MODE_OFF']()
            }
        },
    },
    methods: {
        ...mapMutations([
            'toolbar/SET_MODAL_MODE_ON',
            'toolbar/SET_MODAL_MODE_OFF',
        ]),
    }
}
</script>
