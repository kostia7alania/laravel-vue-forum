<template>
    <v-container>
        <v-form @submit.prevent="login">
            <v-text-field
                label="E-mail"
                v-model.trim="email"
                type="email"
                required
            ></v-text-field>

            <v-text-field
                label="Password"
                v-model.trim="password"
                type="password"
                required
            ></v-text-field>

            <v-btn color="green" :disabled="disabled" type="submit">
                <v-progress-circular v-if="loading" :width="7" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else-if="disabled">cancel</v-icon>
                <v-icon v-else>done_all</v-icon>
                &nbsp;Login</v-btn>
            <v-btn to="/signup" color="blue">
            <v-icon>fingerprint</v-icon>
            Sign up</v-btn>
        </v-form>
    </v-container>
</template>

<script>

  export default {
    data ()  {
        return {
                email:null,
                password: null,
                loading:false,
        }
    },
    created() {
        if(User.loggedIn()) {
            this.$router.push({name: 'forum'});
        }
    },
    computed: {
        disabled() {
            return !this.email || !this.password
        }
    },
    methods: {
        async login() {
            this.loading = true;
            let req = await User.login({ email: this.email, password: this.password } );
            this.loading = false
            if(req) {
                this.$router.push({name:'forum'})
                snack('Successfully logged in', 'success')
            }
            else snack('Invalid password', 'error')

        }
    },
  }
</script>
