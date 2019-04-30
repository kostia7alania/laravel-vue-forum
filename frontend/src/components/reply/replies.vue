<template>
    <div>

               <v-toolbar color="cyan" dark dense>
                    <v-toolbar-title>Комментарии ({{ replies_length }})
                        <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                    </v-toolbar-title>
                </v-toolbar>


        <reply
            v-for="(reply,index) in GETTER_TOPIC_REPLIES"
            :key="reply.id"
            :data="reply"
            :index="index"
        />
    </div>
</template>

<script>
import reply from "./reply";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "REPLIES",
  components: { reply },
  data() {
    return {
      content: null//old replies
    };
  },
  async mounted() {
    this.listen();
    const replies = await this["reply/getReplies"]()
    if(replies && replies.stat) snack("Комментарии обновлены!", "success");
    else snack(`Комментарии не получены.
    ${typeof replies == 'object' && replies.msg || '' }`, "error");
  },
  computed: {
    ...mapGetters(["login/id", "reply/GETTER_TOPIC_REPLIES", "reply/loading"]),
    GETTER_TOPIC_REPLIES() {
      return this["reply/GETTER_TOPIC_REPLIES"];
    },
    loading() {
      return this["reply/loading"];
    },
    replies_length() {
        return this.GETTER_TOPIC_REPLIES && this.GETTER_TOPIC_REPLIES.length || 0
    }
  },
  methods: {
    ...mapActions(["reply/getReplies"]),
    listen() {
      EventBus.$on("deleteReply", index => {
        axios
          .delete(
            `/question/${this.question.slug}/reply/${this.content[index].id}`
          )
          .then(res => {
            this.content.splice(index, 1);
          })
          .catch(err => console.warn(err));
      });

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
