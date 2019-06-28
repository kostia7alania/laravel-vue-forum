<template>
    <v-card>
        <v-container fluid>
            <v-card-title>
                <div class="headline"> {{ question.title }} </div>
                <v-spacer></v-spacer>
                <v-btn @click="gotoComments" color="teal" dark>{{ replyCount }} Комментариев</v-btn>
            </v-card-title>

            <v-layout 2 align-center justify-end>
                <user-info :question="question"/>
                <rating />
            </v-layout>

            <v-card-text v-html="body"></v-card-text>

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
import { mapGetters, mapActions, mapState } from "vuex";
import userInfo from "@/components/user-info";
import ratingVue from "./rating.vue";

export default {
  name: "forum--question-show",
  components: {
    "user-info": userInfo,
    rating: ratingVue
  },
  props: ["question"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["login/id", "reply/GETTER_TOPIC_REPLIES_ARR"]),
    replyCount() {
      const slug = this.$route.params.slug; //this['global/slug'] //router.history.current.params.slug//не реактивно =(
      const replies_arr = this["reply/GETTER_TOPIC_REPLIES_ARR"];
      if (typeof replies_arr != "object") return 11;
      return slug in replies_arr ? replies_arr[slug].length : 0;
      //return this.question.reply_count //<--меняется в процессе;  поетому непригодно
    },
    own() {
      return this["login/id"] == this.question.id;
    },
    body() {
      const txt = this.question.body;
      return md.parse(txt ? txt : "");
    }
  },
  created() {
    Echo.private("App.User." + this["login/id"]).notification(notification => {
      this.replyCount++;
    });
    EventBus.$on("deleteReply", () => {
      this.replyCount--;
    });
    Echo.channel("deleteReplyChannel").listen("DeleteReplyEvent", e => {
      this.replyCount--;
    });
  },
  methods: {
    ...mapActions(["question/questionDelete"]),
    gotoComments() {
      this.$vuetify.goTo(".comments");
    },
    async destroy() {
      const res = await this["question/questionDelete"](this.question.slug);
      if (res) {
        this.$router.push({ name: "forum" });
        snack("Тема успешно удалена", "success");
      } else snack("Не удалось удалить тему", "error");
    },
    edit() {
      EventBus.$emit("startEditing");
    }
  }
};
</script>
