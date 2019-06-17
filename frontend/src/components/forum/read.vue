<template>
    <div>

        <BreadcrumbsVue :category='question.category' :name='question.title'/>

        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <div v-else-if="question">
            <question-edit v-if="editing" :question="question" />
            <question-show v-else :question="question" />
       </div>

       <v-container  v-if="question">
            <replies/>
            <new-reply/>
       </v-container>

    </div>
</template>

<script>
import QuestionEdit from "./QuestionEdit";
import QuestionShow from "./QuestionShow";
import replies from "@/components/reply/replies";
import NewReply from "@/components/reply/newReply";

import { mapGetters } from 'vuex'
import BreadcrumbsVue from './Breadcrumbs.vue';

export default {
  components: { QuestionEdit, QuestionShow, replies, NewReply, BreadcrumbsVue },
  data() {
    return {
      question: {},
      editing: null,
      loading: false
    };
  },
  mounted() {
    this.listen();
    this.getQuestion();
  },
  computed: {
      ...mapGetters([
          'login/loggedIn',
      ])
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
        .get(`/question/${this.$route.params.slug}`)
        .then(res => {
            this.question = res.data.data
        })
        .finally( () => this.loading = false)
    }
  }
};
</script>
