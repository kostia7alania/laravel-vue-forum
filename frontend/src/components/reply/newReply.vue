<template>
    <div class="mt-4">
        <markdown-editor
            v-model.trim="body"
            ref='mark'
        />
        <v-btn v-if="loggedIn" dark @click="submit" :disabled="!body.length" color="green">
        <v-icon>reply</v-icon> Reply </v-btn>
        <v-btn v-else dark to="/login" :disabled="!body.length" color="green"> Log in for reply </v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'new-Reply',
    data() {
        return {
            body: ''
        }
    },
    mounted() {
        this.$refs.mark.simplemde.codemirror.on('blur', (instance, changeObj) => {
            console.log('blur=>', this.body)
            this['reply/SET_TOPIC_DRAFT'](this.body)
      })
      const body = this['reply/GETTER_TOPIC_DRAFT'];
      this.body = body
    },
    computed: {
      ...mapGetters([
          'login/loggedIn',
          'reply/GETTER_TOPIC_DRAFT'
      ]),
      loggedIn(){return this['login/loggedIn']}
    },
    methods: {
        ...mapMutations([
            'reply/SET_TOPIC_DRAFT'
        ]),
        ...mapActions([
            'reply/newReply'
        ]),
        async submit() {
                const comm = await this['reply/newReply']({body:this.body })
                if(comm) {
                    this.body = ''
                } else {
                    console.log('cant Comment HANDLER')
                }
        },

    }
}
</script>
