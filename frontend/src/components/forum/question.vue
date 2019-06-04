<template>
      <div  z-index=0>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
                <router-link :to="question.path">
                    {{ question.title }}
                </router-link>
            </h3>

            <user-info :question="question"/>

          </div>
        </v-card-title>
        <v-card-text>
            {{ question.body }}
        </v-card-text>
      </div>
</template>

<script>

import userInfo from '@/components/user-info'
export default {
    components:{
        'user-info':userInfo
    },
    name: 'question',
    props: ['question'],
}
</script>
