<template>
         <v-layout 2 align-center justify-end>


            <v-rating
                v-model="rating"
                color="indigo"
                background-color="indigo lighten-3"
                half-increments
                hover
                dense
                size=18
            />

             <span class="grey--text text--lighten-2 caption mr-2">
               {{ rating }} ({{ reviews }})
            </span>

          </v-layout>
</template>

<script>
export default {
    name:'rating',
    data: () => ({
      reviews: 413,
      rating: 4.5,
    }),
}
</script>
