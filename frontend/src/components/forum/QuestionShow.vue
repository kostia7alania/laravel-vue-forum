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
                <v-btn color="teal" dark>{{ replyCount }} Replies</v-btn>
            </v-card-title>

            <v-card-text v-html="body"></v-card-text>

                <div grey--text>
                    <v-divider/>
                    <v-icon size=25.1>account_circle</v-icon>
                        {{ question.user }}
                        <v-icon size=25.5>date_range</v-icon>
                    {{ created_at }}

                    <v-tooltip v-if="updated_at" bottom class="pl-2">
                        <template v-slot:activator="{ on }">
                            <span v-on="on"><v-icon size=24>border_color</v-icon></span>
                        </template>
                        <span>Updated at: {{ updated_at }}</span>
                    </v-tooltip>

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




             </div>
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
        },
        created_at() {
            return  new Date(this.question.created_at).toLocaleString()
        },
        updated_at() {
            if(!this.question || !this.question.updated_at) return false;
            const updated = new Date(this.question.updated_at);
            const created = new Date(this.question.created_at);
            return +created==+updated?false:updated.toLocaleString()
        }
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
