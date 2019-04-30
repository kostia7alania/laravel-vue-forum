<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>

                <v-toolbar color="cyan" dark dense>
                    <v-toolbar-title>Questions
                        <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                    </v-toolbar-title>
                </v-toolbar>


                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
                </div>

                <question v-else-if="questions" v-for="(question,i) in questions"
                          :key="question.path+i"
                          :question="question"/>

                <div v-if="questions" class="text-xs-center">
                        <v-pagination
                        v-model="meta.current_page"
                        :length="lenComp"
                        />
                </div>

            </v-flex>
            <v-flex xs4>
                <Categories/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import question from "./question";
import Categories from "@/components/category/Categories.vue";

export default {
  name: "forum",
  components: {
    question,
    Categories
  },
  data() {
    return {
      questions: null,
      loading: false,
      meta: {
            current_page: 1,
            from: 1,
            last_page: 17,
            per_page: 2,
            to: 2,
            total: 34
        }
    };
  },
  created() {
      this.getQuestions()
  },
  computed: {
    lenComp() {
        return Math.ceil(this.meta.total/this.meta.per_page)
    },
  },
  watch: {
      'meta.current_page'(neww,old){
          console.log('page Changed=>',arguments)
          this.getQuestions();
      },
  },
  methods: {
    getQuestions() {
      this.loading = true;
      axios
        .get(`/question?page=${this.meta.current_page}`)
        .then(res => {
          this.questions = res.data.data;
          this.meta = res.data.meta;
        })
        .catch(error => console.log(error.response.data))
        .finally(() => (this.loading = false));
    }
  }
};
</script>
