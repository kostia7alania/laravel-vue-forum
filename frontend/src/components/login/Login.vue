<template>
    <v-container>
        <v-form @submit.prevent="loginSubmit">
            <email :valid="valid" :form="form"/>
            <password :valid="valid" :form="form" min='1'/>
            <v-btn color="green" :disabled="disabled" type="submit">
                <v-progress-circular v-if="loading" :width="7" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else-if="disabled">cancel</v-icon>
                <v-icon v-else>done_outline</v-icon>
                &nbsp;
                Войти
            </v-btn>
            <v-btn @click="toRegHandler" color="blue" class="ml-2"> <v-icon>assignment</v-icon> Зарегистрироваться</v-btn>
            </v-form>
    </v-container>
</template>

<script>

import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import emailVue from '../inputs/email.vue';
import passwordVue from '../inputs/password.vue';

export default {
    components: {'email': emailVue, 'password':passwordVue},
    data ()  {
        return {
            valid:{
                email:false,
                password:false,
            },
            form: {
                email: '',
                password: '',
            },
            loading:false,
        }
    },
    mounted() {
        if(this['login/loggedIn']) {
            this.$router.push({name: 'forum'});
        }
    },
    computed: {
       // ...mapState(['toolbar/modalMode']),
        ...mapGetters([
            'login/loggedIn'
        ]),
        modalMode(){
            return this.$store.state.toolbar.modalMode
        },
        disabled() {
            return !this.valid.email || !this.valid.password
        }
    },
    methods: {
        ...mapMutations([
            'toolbar/SET_MODAL_MODE_OFF'
        ]),
        ...mapActions([ 'login/login' ]),
        async loginSubmit() {
            this.loading = true;
            const res = await this['login/login'](this.form)
            if(typeof res != 'object') snack('Ошибка сервера', 'error')
            else if('token' in res) {
                const m = this.modalMode
                if(!m)  this.$router.push( { name: 'forum' } )
                this['toolbar/SET_MODAL_MODE_OFF']()
                snack('Вы успешно вошли', 'success')
            } else if(res.message.match('401')) {
                snack('Неверный пароль', 'error')
            } else if(res.message.match('429')) {
                snack('Слишком много попыток входа', 'error')
            }
            else {
                snack('Произошла необработанная ошибка', 'error')
            }
            this.loading = false
        },
        toRegHandler(){
            if(!this.modalMode) this.$router.push( { name: 'signup' } )
            this.$emit('toRegMode');
        },
    },
  }
</script>
