<template>
    <v-container>
        <v-form @submit.prevent="handleSubmit">
            <v-text-field
                label="E-mail"
                v-model.trim="form.email"
                type="email"
                required
            ></v-text-field>

            <v-text-field
                label="Password"
                v-model.trim="form.password"
                type="password"
                required
            ></v-text-field>

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

export default {
    data ()  {
        return {
            form: {
                email:null,
                password: null,
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
            return !this.form.email || !this.form.password
        }
    },
    methods: {
        ...mapMutations([
            'toolbar/SET_MODAL_MODE_OFF'
        ]),
        ...mapActions([ 'login/login' ]),
        async handleSubmit() {
            this.loading = true;
            const req = await this['login/login'](this.form)
            if(req) {
                const m = this.modalMode
                if(!m)  this.$router.push( { name: 'forum' } )
                this['toolbar/SET_MODAL_MODE_OFF']()
                snack('Вы успешно вошли', 'success')
            } else snack('Неверный пароль', 'error')
            this.loading = false
        },
        toRegHandler(){
            if(!this.modalMode) this.$router.push( { name: 'signup' } )
            this.$emit('toRegMode');
        },
    },
  }
</script>
