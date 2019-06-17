

<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>

                <v-toolbar color="cyan" dark dense>
                    <v-toolbar-title>
                        {{ category_name }}
                        <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>

                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                         {{ quantity }}
                    </v-toolbar-items>
                </v-toolbar>

                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
                </div>

                <question v-else-if="questions.length" v-for="(question,i) in questions"
                        :key="question.path+i"
                        :question="question"
                />
                <empty v-else/>

                <pagination v-if="questions.length" @pageChange="pageChange"/>
            </v-flex>
            <v-flex xs4> <Categories/> </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
import question from "@/components/forum/question";
import Categories from "@/components/category/Categories.vue";
import { mapActions, mapGetters } from "vuex";

import PaginationVue from './Pagination.vue';
import EmptyCategoryVue from './EmptyCategory.vue';

export default {
  name: "Forum",
  components: { question, Categories, 'pagination':PaginationVue,'empty':EmptyCategoryVue},
  data() {
    return {};
  },
  mounted() {
      if(!this.loading) this.getQuestions(router.history.current.query.page);
  },
    computed: {
        ...mapGetters([
            'question/questions',
            'question/loading',
            'category/GET_CATEGORIES',
            'question/GETTER_meta'
      ]),
        category_name() {
          const slug = this.slug
          if(!slug) return "Последние темы"
          const res = this['category/GET_CATEGORIES'].filter(e=>e.slug===slug)
          if(res && res.length) return res[0].name
          return slug //пока грузится - показываем слог
      },
      loading()     { return this['question/loading'] },
      questions()   { return this['question/questions'] },
      meta()        { return this['question/GETTER_meta'] },
      isCategoryMode() {return !!this.slug },
    lenComp() { return Math.ceil(this.meta.total/this.meta.per_page) },
      slug() {
          return this.$route.params&&this.$route.params.slug
      },
      quantity() {
          const questions =  this.questions instanceof Array && this.questions.length || ''
          if(!questions || this.loading) return '';
          if(this.meta && this.meta.total) return `${this.meta.from}-${this.meta.to} из ${this.meta.total}`
          return questions
      }
  },
  methods: {
    ...mapActions([
      "question/getQuestions",
      "question/getQuestionByCategorySlug"
    ]),
    pageChange(num){
        console.log('go to page =>',num)
        this.getQuestions(num)

    },
    async getQuestions(page = 1) {
      const slug = this.slug
      let res;
      const query = page>1 ? {page}:{}
      if (!slug) {
        this.$router.push({name:'forum', query})
        res = await  this["question/getQuestions"]({page});
      }
      else {
        this.$router.push({name:'CategoryQuestions', query})
          res = await this["question/getQuestionByCategorySlug"]({slug,page});
      }
      if (!res) snack("Ошибка при получении списка", "error");
      else snack("Список обновлен!", "success");
    },
  }
};
</script>
