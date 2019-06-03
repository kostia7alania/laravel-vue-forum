<template>
<div class="mt-3">
    <v-card>

        <v-card-title>
            <div class="headline">{{ data.user }}</div>
            <div class="pl-2"> {{ created_at }}</div>
            <v-tooltip v-if="show_updated_at" bottom class="pl-2">
                <template v-slot:activator="{ on }">
                    <span v-on="on"><v-icon>border_color</v-icon></span>
                </template>
                <span>Updated at: {{ updated_at }}</span>
            </v-tooltip>
            <v-spacer/>
            <Like :content="data"/>
        </v-card-title>

        <v-divider/>
        <edit-reply
            v-if="editing"
            :data=data
        />

        <v-card-text v-else v-html="reply"></v-card-text>

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

export default {
  name: "reply",
  props: ["data", "index"],
  components: { editReply, Like },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    ...mapGetters(["login/id", "login/loggedIn"]),
    own() {
      return this["login/id"] == this.data.user_id;
    },
    reply() {
      return md.parse(this.data.reply);
    },
    created_at() { return this.parseDate(this.data.created_at) },
    updated_at() { return this.parseDate(this.data.updated_at) },
    show_updated_at() { return new Date(this.data.updated_at) && new Date(this.data.updated_at)!='Invalid Date' && (+new Date(this.data.created_at) != +new Date(this.data.updated_at)) },
  },
  created() {
    this.listen();
  },
  methods: {
    parseDate: date => date.toLocaleString() != 'Invalid Date'?date.toLocaleString():'',
    destroy() {
      EventBus.$emit("deleteReply", this.index);
    },
    edit() {
      this.editing = true;
    },
    listen() {
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    }
  }
};
</script>
