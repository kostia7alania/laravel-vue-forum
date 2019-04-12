<template>
    <div>

        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <div v-if="question">
            <question-show :question="question"/>
       </div>

    </div>
</template>

<script>
import QuestionShow from "@/components/forum/QuestionShow";

export default {
    name: "Category-Questions",
  components: { QuestionShow },
  data() {
    return {
      question: null,
      loading: false
    };
  },
  created() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
        this.loading = true;
      axios
        .get(`/category/${this.$route.params.slug}`)
        .then(res => {
            this.question = res.data.data
        })
        .finally( () => this.loading = false)
    }
  }
};
</script>
