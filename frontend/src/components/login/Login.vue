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
                <v-icon v-else>done_all</v-icon>
                &nbsp;
                Login
            </v-btn>
                <v-btn to="/signup" color="blue"> <v-icon>fingerprint</v-icon> Sign up</v-btn>
            </v-form>
    </v-container>
</template>

<script>

import { mapGetters, mapActions, mapState } from 'vuex'

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
    created() {
        if(this['login/loggedIn']) {
            this.$router.push({name: 'forum'});
        }
    },
    computed: {
        ...mapGetters([
            'login/loggedIn'
        ]),
        disabled() {
            return !this.form.email || !this.form.password
        }
    },
    methods: {
        ...mapActions([
            'login/login'
        ]),
        async handleSubmit() {
            this.loading = true;
            const req = await this['login/login'](this.form)
            if(req) {
                this.$router.push( { name: 'forum' } )
                snack('Successfully logged in', 'success')
            } else snack('Invalid password', 'error')
            this.loading = false
        }
    },
  }
</script>
