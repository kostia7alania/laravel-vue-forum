<template>
  <v-footer
      <v-card-actions class="grey darken-3 justify-center">
        <v-flex primary lighten-1 py-1 text-xs-center white--text xs12 >
            &copy; {{ new Date().getFullYear() }} — <strong>ФОРУМ</strong>
        </v-flex>
      </v-card-actions>
  </v-footer>
</template>

<script>
export default {
  name: "footer",
  data: () => ({
   })
};
</script>
