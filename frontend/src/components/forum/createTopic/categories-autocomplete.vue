<template>
            <v-autocomplete
                :items="categories"
                item-text="name"
                item-value="id"
                cache-items
                :loading="loading"
                v-model="form.category_id"
                label="Category"
                  style="z-index:22222;"
                hint="Type the first letters and select the appropriate category"
            ></v-autocomplete>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Categories-autocomplete",
  props: ["form"],
  data() {
    return { };
  },
  created() {
    this["category/getCategories"]();
  },
  computed: {
    ...mapGetters(["category/categories", "category/loading"]),
    categories() {
      return this["category/categories"];
    },
    loading() {
      return this["category/loading"];
    }
  },
  methods: {
    ...mapActions(["category/getCategories"])
  }
};
</script>

