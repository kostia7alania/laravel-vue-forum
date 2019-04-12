<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>

                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
                </div>

                <question v-else v-for="(question,i) in questions"
                          :key="question.path+i"
                          :question="question"/>
            </v-flex>
            <v-flex xs4>
                <app-sidebar/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import question from './question'
import AppSidebar from './AppSidebar'
export default {
    name: 'forum',
    components: {
        question,AppSidebar
    },
    data() {
        return {
            questions: {},
            loading: false
        }
    },
    created() {
        this.loading = true;
        axios.get('/question')
        .then(res=> {
            this.questions = res.data.data;
        })
        .catch(error=>console.log(error.response.data))
        .finally( () => this.loading = false)
    }

}
</script>
