<template>
    <div class="mt-4">
        <markdown-editor
            v-model.trim="body"
            ref='mark'
        />
        <v-btn v-if="loggedIn" dark @click="submit" :disabled="!body.length" color="green">
            <v-icon>reply</v-icon> Ответить
        </v-btn>
        <v-btn v-else dark @click="login" :disabled="!body.length" color="green">Войдите, чтобы оставить комментарий </v-btn>
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
            'reply/SET_TOPIC_DRAFT',
            'toolbar/SET_MODAL_MODE_ON'
        ]),
        ...mapActions([
            'reply/newReply'
        ]),
        login(){
            this['toolbar/SET_MODAL_MODE_ON']()
        },
        async submit() {
                const comm = await this['reply/newReply']({body:this.body })
                console.log('comm submit =>',comm)
                if(typeof comm != 'object') return snack('Ошибка при отправке комменатрия', 'danger')
                if(!comm.state) return snack('Ошибка при отправке комменатрия: '+ comm.msg, 'danger')
                snack('Комменатрий успешно отправлен!', 'success')
                this.body = ''

        },

    }
}
</script>
