<template>
    <div class="comments">
        <v-toolbar color="cyan" dark dense>
            <v-toolbar-title>Комментарии ({{ replies_length }})
                <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
            </v-toolbar-title>
        </v-toolbar>
        <replyRender
            v-for="(reply,index) in replies"
            :key="reply.id"
            :reply="reply"
            :index="index"
            @deleteReply="deleteReply"
        />
    </div>
</template>

<script>
import replyRender from "./reply";

import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "REPLIES",
  components: { replyRender },
  data() {
    return {
      content: null, //old replies
      replies: []
    };
  },
  async mounted() {
    const slug = this.$router.history.current.params.slug;
    this["global/SET_SLUG"](slug);

    const replies = await this["reply/GET_TOPIC_REPLIES"]();
    if (replies) this.replies = replies;

    this.listen();
    this.updateReplies();
  },
  computed: {
    ...mapGetters(["login/id", "reply/loading"]),

    loading() {
      return this["reply/loading"];
    },

    replies_length() {
      return this.replies.length;
    }
  },
  methods: {
    ...mapMutations(["global/SET_SLUG"]),
    ...mapActions([
      "reply/getReplies",
      "reply/GET_TOPIC_REPLIES",
      "reply/deleteReply"
    ]),

    async updateReplies() {
      const res = await this["reply/getReplies"]();
      if (res && res.stat) {
        this.replies = res.replies;
        snack("Комментарии обновлены!", "success");
      } else
        snack(
          `Комментарии не получены. ${(typeof res == "object" && res.msg) ||
            ""}`,
          "error"
        );
    },
    async deleteReply(index) {
      const res = await this["reply/deleteReply"](this.replies[index].id);
      if (res && res.stat) {
        snack("Комментарий удален!", "success");
        this.replies.splice(index, 1);
        this.updateReplies();
      } else
        snack(
          `Комментарий не удален. ${(typeof res == "object" && res.msg) || ""}`,
          "error"
        );
    },
    listen() {
      Echo.private("App.User." + this["login/id"]).notification(
        notification => {
          console.log("NOTIF->", notification, notification.type);
          this.content.unshift(notification.reply);
        }
      );

      Echo.channel("deleteReplyChannel").listen("DeleteReplyEvent", e => {
        console.log("DeleteReplyEvent=>", e);
        for (let index = 0; index < this.content.length; index++) {
          if (this.content[index].id == e.id) {
            this.content.splice(index, 1);
          }
        }
      });
    }
  }
};
</script>
