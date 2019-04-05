<template>
    <div class="mt-4">
        <markdown-editor v-model.trim="body" />
        <v-btn dark @click="submit" :disabled="!body.length" color="green"> Reply </v-btn>
    </div>
</template>

<script>
export default {
    name: 'newReply',
    props: ['questionSlug'],
    data() {
        return {
            body: ''
        }
    },
    methods: {
        submit() {
            axios
                .post(`/api/question/${this.questionSlug}/reply`, {body: this.body})
                .then(res => {
                    EventBus.$emit('newReply',res.data.Reply)
                    this.body = ''
                }).catch( err => console.warn(err));
        }
    }
}
</script>
