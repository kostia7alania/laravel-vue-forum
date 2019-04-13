

<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>
                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
                </div>
                <div v-else >
                        <h1>{{ question.name }} ({{question.questions.length }})</h1>
                            <question v-for="(question,i) in question.questions"
                                    :key="question.path+i"
                                    :question="question"/>
                    </div>
            </v-flex>
            <v-flex xs4>
                <app-sidebar/>
            </v-flex>
        </v-layout>
    </v-container>
</template>



<script>
import question from '@/components/forum/question'
import AppSidebar from '@/components/forum/AppSidebar'

export default {
    name: "Category-Questions",
    components: { question,AppSidebar },
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
