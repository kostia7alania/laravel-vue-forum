<template>
    <v-container>
        <v-form @submit.prevent="signup">
            <v-text-field
                label="Имя"
                v-model="form.name"
                type="text"
                required
            ></v-text-field>
            <span class="red--text" v-if="errors.name">{{ errors.name[0] }}</span>

            <v-text-field
                label="E-mail"
                v-model="form.email"
                type="email"
                required
            ></v-text-field>
            <span class="red--text" v-if="errors.email"></span>
            <span class="red--text" v-if="errors.email">{{ errors.email[0] }}</span>


            <v-text-field
                label="Пароль"
                v-model="form.password"
                type="password"
                required
            ></v-text-field>
            <span class="red--text" v-if="errors.password">{{ errors.password[0] }}</span>


            <v-text-field
                label="Подтверждение пароля"
                v-model="form.password_confirmation"
                type="password"
                required
            ></v-text-field>


            <v-btn :disabled='!isFormValid' color="green" type="submit">
                 <v-icon>done_outline</v-icon>
                 Зарегистрироваться
            </v-btn>


            <v-btn @click="toLoginHandler" color="blue" class="ml-2"> <v-icon>person</v-icon>Войти</v-btn>


        </v-form>
    </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
export default {
    name:'sign-up',
    data ()  {
        return {
            form:{
                name:null,
                email: null,
                password: null,
                password_confirmation: null,
            },
            errors: {

             }
        }
    },
    mounted() {
        if( this['login/loggedIn'] ) this.goHome()
    },
    computed: {
        ...mapState(['toolbar/modalMode']),
        ...mapGetters(['login/loggedIn',]),
        modalMode() {
            return this.$store.state.toolbar.modalMode
        },
        isFormValid() {
            const name = this.form.name
            const email = this.form.email
            const password = this.form.password
            const password_confirmation = this.form.password_confirmation
            return name && email && password && password_confirmation
        }
    },
    destroyed() {
        this.$emit('toLoginMode');
    },
    methods: {
        ...mapMutations([
            'toolbar/SET_MODAL_MODE_OFF'
        ]),
        ...mapActions(['login/register']),
        goHome() {
            this.$router.push('/forum');
        },
        async signup() {
            const password = this.form.password
            const password_confirmation = this.form.password_confirmation
            if(password!=password_confirmation ) return snack('Пароли не совпадают!', 'error')

            const res = await this['login/register'](this.form);
            if(res==true) {
                const m = this.modalMode
                if(!m) this.goHome();
                this['toolbar/SET_MODAL_MODE_OFF']()
            }
            else if(!res) snack('Возникла сетевая ошибка во время регистрации', 'error')
            else {
                this.errors = res
                snack('Возникли ошибки во время регистрации', 'error')
            }
        },
        toLoginHandler(){
            if(!this.modalMode) this.$router.push( { name: 'login' } )
            this.$emit('toLoginMode');
        },
    },
  }
</script>
