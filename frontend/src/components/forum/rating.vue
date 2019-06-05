<template>
         <v-layout 2 align-center justify-center fill-height>
            <v-rating
              :value="value"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="ml-2 grey--text text--darken-2">
              <span>{{ value }}</span>
              <span>({{ reviews }})</span>
            </div>

          </v-layout>
</template>

<script>
export default {
    name:'rating',
    data: () => ({
      reviews: 413,
      value: 4.5,
    }),
}
</script>
