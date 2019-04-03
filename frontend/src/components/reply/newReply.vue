<template>
    <div class="mt-4">
        <markdown-editor v-model.trim="body" />
        <v-btn v-if="loggedIn" dark @click="submit" :disabled="!body.length" color="green">
        <v-icon>reply</v-icon>
            Reply
        </v-btn>
        <v-btn v-else dark to="/login" :disabled="!body.length" color="green"> Log in for reply </v-btn>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
        ...mapActions([
            'reply/newReply'
        ]),
        async submit() {
                const comm = await this['reply/newReply']({questionSlug: this.questionSlug, body:this.body })
                if(comm) {
                    this.body = ''
                } else {
                    console.log('cant Comment HANDLER')
                }
        },

    }
}
</script>
