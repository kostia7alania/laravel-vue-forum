

<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>

                <v-toolbar color="cyan" dark dense>
                    <v-toolbar-title>{{ slug }} {{ quantity }}
                        <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                    </v-toolbar-title>
                </v-toolbar>

                <question v-for="(question,i) in questions"
                        :key="question.path+i"
                        :question="question"
                />

            </v-flex>
            <v-flex xs4>
                <Categories/>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
import question from "@/components/forum/question";
import Categories from "@/components/category/Categories.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Category-Questions",
  components: { question, Categories },
  data() {
    return {};
  },
  created() {
    this.getQuestions();
  },
  computed: {
      ...mapGetters([
          'question/questions',
      "question/loading"
      ]),
      loading() {
          return this['question/loading']
      },
      questions() {
          return this['question/questions']
      },
      slug(){
          return this.$route.params&&this.$route.params.slug || "Last questions"
      },
      quantity(){
          return this.questions instanceof Array && `(${this.questions.length})` || ''
      }
  },
  methods: {
    ...mapActions([
      "question/getQuestions",
      "question/getQuestionByCategorySlug"
    ]),
    async getQuestions() {
      let slug = this.$route.params.slug;
      window.t = this
      let res;
      if (!slug) res = await  this["question/getQuestions"]();
      else res = await this["question/getQuestionByCategorySlug"](slug);
      if (!res) snack("Ошибка при получении списка", "error");
      else snack("Список обновлен!", "success");
    },
  }
};
</script>
