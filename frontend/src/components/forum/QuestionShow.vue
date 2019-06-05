<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div>
                    <div class="headline">
                        {{ question.title }}
                    </div>
                </div>
                <v-spacer></v-spacer>
                <v-btn color="teal" dark>{{ replyCount }} Комментариев</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

            <user-info :question="question"/>

            <v-card-actions v-if="own" class="text-xs-center d-flex align-center">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" v-on="on" @click="edit">
                                <v-icon color="orange">edit</v-icon>
                                Редактировать
                            </v-btn>
                        </template>
                        <span>Редактировать тему</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn  color="primary" dark v-on="on" @click="destroy">
                                <v-icon color="red">delete</v-icon>
                                Удалить
                            </v-btn>
                        </template>
                        <span>Удалить тему</span>
                    </v-tooltip>

            </v-card-actions>

        </v-container>
    </v-card>
</template>


<script>
import { mapGetters } from 'vuex';
import userInfo from '@/components/user-info'

export default {
    name:"forum--question-show",
    components: {
        'user-info': userInfo,
    },
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
        },
    },
    created() {
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
