<template>
    <v-container>


        <v-form @submit.prevent="submit">

            <v-alert v-if="errors.name" type="error" color="red" :value="true">
                {{ errors.name[0] }}
            </v-alert>
            <v-text-field label="Имя категории" v-model.trim="form.name" required ></v-text-field>

            <v-btn type="submit" :disabled="disabled" :color="editSlug?'pink':'teal'">
                <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else>{{editSlug?"update":"playlist_add"}}</v-icon>
                        {{ editSlug?"Обновить":"Создать" }}
            </v-btn>
            <v-btn v-if="editSlug && !loading" color="purple" @click="cancelEditing">
                <v-icon>cancel</v-icon>
                Отмена
            </v-btn>

        </v-form>

        <v-card>
            <v-toolbar color="indigo" dark dense>
            <v-toolbar-title>Категории
                <v-progress-circular v-if="category_loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
            </v-toolbar-title>
            </v-toolbar>

            <v-list>
                <div v-for="category in categories" :key="category.id">
                  <v-list-item>
                      <v-list-item-action>
                          <v-btn icon small @click="edit(category.name, category.slug)" :disabled="editSlug==category.slug || isDeleting(category.slug) || loading">
                              <v-icon color="orange">edit</v-icon>
                          </v-btn>
                      </v-list-item-action>

                      <v-list-item-content>
                          <v-list-item-title :class="isDeleting(category.slug)?'deleting-text':''">
                              {{ category.name }}
                          </v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                          <v-btn icon small @click="destroy(category.slug)" :disabled="isDeleting(category.slug)">
                              <v-progress-circular v-if="isDeleting(category.slug)" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                              <v-icon color="red" v-else>delete</v-icon>
                          </v-btn>
                      </v-list-item-action>

                  </v-list-item>
                  <v-divider/>
                </div>

            </v-list>
        </v-card>

    </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Edit-Categories",
  data() {
    return {
      loading: false,
      form: {
        name: null
      },
      editSlug: null,
      errors: {},
      deletingSlug: []
    };
  },
  mounted() {
    this["category/getCategories"]();
  },
  computed: {
    ...mapGetters(["category/categories", "category/loading"]),
    disabled() {
      return !this.form.name || this.loading;
    },
    categories() {
      return this["category/categories"];
    },
    category_loading() {
      return this["category/loading"];
    }
  },
  methods: {
    ...mapActions([
      "category/getCategories",
      "category/createCategory",
      "category/updateCategory",
      "category/deleteCategory"
    ]),
    isDeleting(slug) {
      return this.deletingSlug.indexOf(slug) != -1;
    },
    cancelEditing() {
      this.editSlug = null;
      this.form.name = null;
    },
    submit() {
      this.editSlug ? this.update() : this.create();
    },
    update() {
      this.loading = true;
      this["category/updateCategory"]({ slug: this.editSlug, form: this.form })
        .then(async () => {
          snack("Имя категории успешно изменено", "success");
          await this["category/getCategories"]();
          this.form.name = null;
          this.editSlug = null;
        })
        .catch(err => {
          console.warn(err);
          snack("Ошибка при обновлении имени категории", "error");
        })
        .finally(() => (this.loading = false));
    },
    create() {
      this.loading = true;
      this["category/createCategory"](this.form)
        .then(() => {
          this["category/getCategories"]();
          this.form.name = null;
          snack("Категория успешно создана", "success");
          this.errors = {};
        })
        .catch(err => {
          if (!err) alert("пусто");
          this.errors = err.response.data.errors;
          snack("Ошибка при создании категории", "error");
        })
        .finally(() => (this.loading = false));
    },
    destroy(slug) {
      this.deletingSlug.push(slug);
      this["category/deleteCategory"](slug)
        .then(async () => {
          snack("Категория успешно удалена", "success");
          return await this["category/getCategories"]();
        })
        .catch(err => {
          console.warn(err);
          snack("Ошибка при удалении категории", "error");
        })
        .finally(() => delete this.deletingSlug[slug]);
    },
    edit(name, slug) {
      this.form.name = name;
      this.editSlug = slug;
    }
  }
};
</script>

<style lang="scss" >
.deleting-text {
  text-decoration: line-through;
}
</style>
