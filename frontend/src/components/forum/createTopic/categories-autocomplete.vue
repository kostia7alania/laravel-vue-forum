<template>
            <v-autocomplete
                :items="categories"
                item-text="name"
                item-value="id"
                cache-items
                browser-autocomplete="new-password"
                :loading="loading"
                v-model="form.category_id"
                label="Категория"
                hint="Введите первое слово и выбите подходящий вариант"
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

