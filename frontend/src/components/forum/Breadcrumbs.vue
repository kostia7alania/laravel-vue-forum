<template>
    <v-breadcrumbs v-if="items" :items="items">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ['category', 'name'],
  name: "bread-crumbs",
  computed: {
    ...mapGetters(["login/loggedIn"]),
    items() {
      if (this.category)
        return [
          {
            text: "Форум",
            disabled: false,
            href: "/forum"
          },
          {
            text: this.category.name,
            disabled: false,
            href: '/category/'+this.category.slug
          },
          {
            text: this.name,
            disabled: true,
            href: 'question/'+this.slug
          },
        ];
    },
    slug() {
        return this.$route.params.slug
    },
  }
};
</script>
