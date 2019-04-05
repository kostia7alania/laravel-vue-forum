<template>
    <div>
        <div v-if="question">
            <question-edit v-if="editing"
                :question="question"
            />
            <question-show v-else
                :question="question"
            />
       </div>
       <v-container  v-if="question">
            <replies :question="question"/>
            <new-reply v-if="loggedIn" :questionSlug="question.slug"/>

            <div class="mt-4" v-else>
                <router-link to="/login">Log in to Reply</router-link>
            </div>
       </v-container>
    </div>
</template>

<script>
import QuestionEdit from "./QuestionEdit";
import QuestionShow from "./QuestionShow";
import replies from "@/components/reply/replies";
import NewReply from "@/components/reply/newReply";

export default {
  components: { QuestionEdit, QuestionShow, replies, NewReply },
  data() {
    return {
      question: null,
      editing: null
    };
  },
  created() {
    this.listen();
    this.getQuestion();
  },
  computed: {
      loggedIn() {
          return User.loggedIn();
      }
  },
  methods: {
    listen() {
      EventBus.$on("startEditing", () => {
        this.editing = true;
      });
      EventBus.$on("cancelEditing", () => {
        this.editing = false;
      });
    },
    getQuestion() {
      axios
        .get(`/api/question/${this.$route.params.slug}`)
        .then(res => (this.question = res.data.data));
    }
  }
};
</script>
