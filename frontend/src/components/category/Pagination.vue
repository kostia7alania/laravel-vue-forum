<template>
    <div class="text-xs-center mt-3">
        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
        </div>
        <v-pagination
            v-else-if="issetMeta"
            :disabled='!isActivePaginator'
            :value="meta.current_page"
            @input="pageChange"
            :length="lenComp"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Pagination",
  computed: {
    ...mapGetters(["question/GETTER_meta", "question/loading"]),
    isActivePaginator() {
      return this.meta.per_page < this.meta.total;
    },
    meta() { return this["question/GETTER_meta"]; },
    issetMeta(){
        return !!Object.keys(this.meta).length
    },
    lenComp() {
      return Math.ceil(this.meta.total / this.meta.per_page);
    },

    loading() {
      return this["question/loading"];
    }
  },
  methods: {
    pageChange(num) {
      this.$emit("pageChange", num);
    }
  }
};
</script>
