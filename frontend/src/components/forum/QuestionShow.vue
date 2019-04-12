<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{ question.title }}
                    </div>
                    <span grey--text> {{ question.user }} said {{ question.created_at }} </span>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{ replyCount }} Replies</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>

        </v-container>
    </v-card>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
    name:"forum-show-question",
    props: ['question'],
    data() {
        return {
            replyCount: this.question.reply_count //<--меняется в процессе;
        }
    },
    computed: {
        ...mapGetters([
            'login/id'
        ]),
        own() {
            return this['login/id'] == this.question.id
        },
        body() {
            return md.parse(this.question.body);
        }
    },
    created() {
        EventBus.$on('newReply', () => {
            this.replyCount++
        })
        Echo.private('App.User.' + this['login/id'] )
            .notification(notification => {
            this.replyCount++
        });
        EventBus.$on('deleteReply', () => {
            this.replyCount--
        })
        Echo.channel('deleteReplyChannel')
            .listen('DeleteReplyEvent', e => {
            this.replyCount--;
        })
    }  ,
    methods: {
        destroy() {
            axios
            .delete(`/question/${this.question.slug}`)
            .then(res => {
                this.$router.push('/forum');
            })
            .catch( err => {
                console.warn('err',err.response.data);
            })
        },
        edit() {
            EventBus.$emit('startEditing')
        }
    }
}
</script>
