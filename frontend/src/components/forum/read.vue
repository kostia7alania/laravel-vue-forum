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
    </div>
</template>

<script>
import QuestionEdit from "./QuestionEdit";
import QuestionShow from "./QuestionShow";

export default {
  components: { QuestionEdit, QuestionShow },
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
