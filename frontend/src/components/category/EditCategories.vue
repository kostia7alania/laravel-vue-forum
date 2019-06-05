<template>
    <v-container>

        <v-alert v-if="errors" type="error" color="red" :value="true">
            Формат категорий неверный (должен содержать минимум 2 слова)
        </v-alert>

        <v-form @submit.prevent="submit">

            <v-text-field
                label="Category Name"
                v-model.trim="form.name"
                required
            ></v-text-field>

            <v-btn type="submit" :disabled="disabled" :color="editSlug?'pink':'teal'">
                <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else>{{editSlug?"update":"playlist_add"}}</v-icon>
                        {{ editSlug?"Update":"Create" }}
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
                <div v-for="(category,index) in categories" :key="category.id">
                <v-list-item>
                    <v-list-item-action>
                        <v-btn icon small @click="edit(category.name, category.slug)" :disabled="editSlug==category.slug || deletingSlug==category.slug || loading">
                            <v-icon color="orange">edit</v-icon>
                        </v-btn>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title :class="deletingSlug==category.slug?'deleting-text':''">
                            {{ category.name }}
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn icon small @click="destroy(category.slug, index)" :disabled="deletingSlug==category.slug">
                            <v-progress-circular v-if="deletingSlug==category.slug" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
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
      errors: null,
      deletingSlug: null
    };
  },
  created() {

    if(!this['login/isAdmin']) { //выкидываем за шкирку НЕадмина;
        console.warn('Брысь отсюда! Ты не админ .!. ');
        this.$router.push( { name:'forum' } )
    } else
    this["category/getCategories"]();
  },
  watch: {
      isAdmin(neww,old) {
        if(!neww) {
            console.warn('Брысь отсюда! Ты не админ .!. ');
            this.$router.push( { name:'forum' } )
        }
      },
  },
  computed: {
    ...mapGetters(["login/isAdmin", "category/categories", "category/loading"]),
    isAdmin(){
        return this['login/isAdmin']
    },
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
            snack("Имя категории успешно изменено", "success")
            await this["category/getCategories"]()
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
            this.form.name = null
            snack("Категория успешно создана", "success")
        })
        .catch(err => {
          console.warn(err);
          this.errors = err.response.data.errors;
          snack("Ошибка при создании категории", "error");
        })
        .finally(() => (this.loading = false));
    },
    destroy(slug, index) {
      this.deletingSlug = slug;
      this["category/deleteCategory"](slug)
        .then(async () => {
            snack("Категория успешно удалена", "success")
            return await this["category/getCategories"]()
        })
        .catch(err => {
          console.warn(err);
          snack("Ошибка при удалении категории", "error");
        })
        .finally(() => (this.deletingSlug = null));
    },
    edit(name,slug) {
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
