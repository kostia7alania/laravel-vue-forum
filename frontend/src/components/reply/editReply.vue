<template>
    <div>
        <markdown-editor v-model="data.reply"/>

        <v-card-actions>
            <v-btn icon small @click="update">
                <v-icon color=green>save</v-icon>
            </v-btn>
            <v-btn icon small @click="cancel">
                <v-icon color=black>cancel</v-icon>
            </v-btn>
        </v-card-actions>

    </div>
</template>

<script>
export default {
    props:['data'],
    methods: {
        update() {
            axios
            .patch(`/question/${this.data.question_slug}/reply/${this.data.id}`, {body: this.data.reply} )
            .then(res => {
                this.cancel();
            })
            .catch(err => console.warn (err));
        },
        cancel() {
            EventBus.$emit('cancelEditing');
        }
    }
}
</script>
