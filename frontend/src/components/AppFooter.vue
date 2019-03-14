<template>
  <v-footer class="justify-center">
      <v-card-actions class="justify-center">
        <v-flex lighten-1 py-1 text-xs-center grey--text xs12 >
       <strong>ФОРУМ</strong>    &copy;     {{ new Date().getFullYear() }}
        </v-flex>
      </v-card-actions>
  </v-footer>
</template>

<script>
export default {
  name: "app-footer",
  data: () => ({
   })
};
</script>
