<template>
<div class="mt-3">
    <v-card>

        <v-card-title>
            <user-info :question="reply"/>
            <!--<div class="headline">{{ reply.user }}</div>
            <div class="pl-2"> {{ created_at }}</div>
            <v-tooltip v-if="show_updated_at" bottom class="pl-2">
                <template v-slot:activator="{ on }">
                    <span v-on="on"><v-icon>border_color</v-icon></span>
                </template>
                <span>Updated at: {{ updated_at }}</span>
            </v-tooltip>-->
            <v-spacer/>
            <Like :content="reply"/>
        </v-card-title>

        <v-divider/>
        <edit-reply
            v-if="editing"
            :reply=reply
        />

        <v-card-text v-else v-html="body"></v-card-text>

        <v-divider/>

        <div v-if="!editing">
            <v-card-actions v-if="own">
                <v-btn icon small @click="edit">
                    <v-icon color="orange">edit</v-icon>
                </v-btn>
                <v-btn icon small @click="destroy">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-card-actions>
        </div>

    </v-card>
</div>
</template>

<script>
import editReply from "./editReply";
import Like from "@/components/likes/like";
import { mapGetters } from "vuex";
import userInfo from '../user-info.vue';

export default {
  name: "reply",
  props: ["reply", "index"],
  components: { editReply, Like, 'user-info':userInfo },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    ...mapGetters(["login/id", "login/loggedIn"]),
    own() {
      return this["login/id"] == this.reply.user_id;
    },
    body() {
        window.t = this;
        let rep = this.reply.reply&&this.reply.reply.replace(/\n{3,99}/g,'<br><br>')
        if(!rep) return;
        rep = rep.replace(/\n{1,3}/g,'<br>')
      return md.parse(rep);
    },
    created_at() { return this.parseDate(this.reply.created_at) },
    updated_at() { return this.parseDate(this.reply.updated_at) },
    show_updated_at() { return new Date(this.reply.updated_at) && new Date(this.reply.updated_at)!='Invalid Date' && (+new Date(this.reply.created_at) != +new Date(this.reply.updated_at)) },
  },
  created() {
    this.listen();
  },
  methods: {
    parseDate: date => date.toLocaleString() != 'Invalid Date'?date.toLocaleString():'',
    edit() {
      this.editing = true;
    },
    destroy(){
        this.$emit('deleteReply', this.index)
    },
    listen() {
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    }
  }
};
</script>
