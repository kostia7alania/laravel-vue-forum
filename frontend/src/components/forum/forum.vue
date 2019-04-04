<template>
    <v-container fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs8>
                <question v-for="(question,i) in questions"
                          :key="question.path+i"
                          :question="question"/>
            </v-flex>
            SIDE--BAR
        </v-layout>
    </v-container>
</template>



<script>
import question from './question'

export default {
    name: 'forum',
    components: {
        question
    },
    data() {
        return {
            questions: {}
        }
    },
    created() {
        axios.get('/api/question')
        .then(res=> {
            this.questions = res.data.data;
        })
        .catch(error=>console.log(error.response.data));
    }

}
</script>
