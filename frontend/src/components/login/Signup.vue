<template>
    <v-container>
        <v-form @submit.prevent="signup">
            <v-text-field
                label="Name"
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
                label="Password"
                v-model="form.password"
                type="password"
                required
            ></v-text-field>
            <span class="red--text" v-if="errors.password">{{ errors.password[0] }}</span>


            <v-text-field
                label="Password"
                v-model="form.password_confirmation"
                type="password"
                required
            ></v-text-field>

            <v-btn
            color="green"
            type="submit"
            >Sign up</v-btn>

            <router-link to="/login">
                <v-btn color="blue">Login</v-btn>
            </router-link>

        </v-form>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
        ...mapGetters([
            'login/loggedIn',
        ])
    },
    methods: {
        ...mapActions([
            'login/register'
        ]),
        goHome(){
            this.$router.push('/forum');
        },
        async signup() {
            const res = await this['login/register'](this.form);
            if(res==true) this.goHome();
            else {
                this.errors = res
                snack('Registration error', 'error')
            }
        }
    },
  }
</script>
