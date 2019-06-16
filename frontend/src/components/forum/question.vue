<template>
 <v-hover>

       <v-card
        slot-scope="{ hover }"
        :elevation="hover ? 12 : 2"
        class="mt-2 mx-auto">

        <v-card-title primary-title>
            <h3 class="headline mb-0">
                <router-link :to="question.path">
                    {{ question.title }}
                </router-link>
            </h3>

            <user-info :question="question"/>
             <v-spacer></v-spacer>
            <rating />

        </v-card-title>
            <v-card-text> {{ question_short }} </v-card-text>

       </v-card>
  </v-hover>
</template>

<script>
import userInfo from "@/components/user-info";
import rating from './rating.vue';
export default {
  components: {
    "user-info": userInfo,
    'rating':rating
  },
  name: "question",
  props: ["question"],
  computed: {
      question_short() {
          let text = this.question.body
          if(typeof text=='string' && text.length>300) text = text.slice(0,300)+'...'
          return text;
      }
  }
};
</script>
