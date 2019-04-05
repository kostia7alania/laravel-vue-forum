<template>
      <v-card  z-index=0>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">
                <router-link :to="question.path">
                    {{ question.title }}
                </router-link>
            </h3>
            <div class="grey--text">
                {{ question.user }} said
                {{ question.created_at }}
            </div>
          </div>
        </v-card-title>
        <v-card-text>
            {{ question.body }}
        </v-card-text>
      </v-card>
</template>

<script>

export default {
    name: 'question',
    props: ['question'],
}
</script>
