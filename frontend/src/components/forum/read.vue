<template>
    <div>

        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <div v-else-if="question">
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
      editing: null,
      loading: false
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
        this.loading = true;
      axios
        .get(`/api/question/${this.$route.params.slug}`)
        .then(res => {
            this.question = res.data.data
        })
        .finally( () => this.loading = false)
    }
  }
};
</script>
