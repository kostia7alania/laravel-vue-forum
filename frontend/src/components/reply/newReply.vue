<template>
    <div class="mt-4">
        <markdown-editor v-model.trim="body" />
        <v-btn v-if="loggedIn" dark @click="submit" :disabled="!body.length" color="green"> Reply </v-btn>
        <v-btn v-else dark to="/login" :disabled="!body.length" color="green"> Log in for reply </v-btn>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'new-Reply',
    props: ['questionSlug'],
    data() {
        return {
            body: ''
        }
    },
    computed: {
      ...mapGetters([
          'login/loggedIn'
      ]),
      loggedIn(){return this['login/loggedIn']}
    },
    methods: {
        submit() {
            axios
                .post(`/question/${this.questionSlug}/reply`, {body: this.body})
                .then(res => {
                    EventBus.$emit('newReply',res.data.Reply)
                    this.body = ''
                }).catch( err => console.warn(err));
        }
    }
}
</script>
