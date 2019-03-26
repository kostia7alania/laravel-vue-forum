<template>
    <v-container>

        <v-alert v-if="errors" type="error" color="red" :value="true">
            Pleasse give category name
        </v-alert>

        <v-form @submit.prevent="submit">
            <v-text-field
                label="Category Name"
                v-model.trim="form.name"
                required
            ></v-text-field>

            <v-btn type="submit" :disabled="disabled" :color="editSlug?'pink':'teal'">{{ editSlug?"Update":"Create" }}</v-btn>

        </v-form>

        <v-card>
            <v-toolbar color="indigo" dark dense>
            <v-toolbar-title>Categories</v-toolbar-title>
            </v-toolbar>


            <div v-if="loading" class="text-xs-center">
                <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
            </div>

            <v-list v-else>
                <div v-for="(category,index) in categories" :key="category.id">
                <v-list-tile>

                    <v-list-tile-action>
                        <v-btn icon small @click="edit(index)">
                            <v-icon color="orange">edit</v-icon>
                        </v-btn>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ category.name }}
                        </v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn icon small @click="destroy(category.slug, index)">
                            <v-icon color="red">delete</v-icon>
                        </v-btn>
                    </v-list-tile-action>

                </v-list-tile>
                <v-divider/>
                </div>

            </v-list>
        </v-card>

    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Edit-Categories',
  data() {
    return {
        loading: false,
        form: {
            name: null
        },
        categories: [],
        editSlug: null,
        errors: null
    };
  },
    created() {
        /*
    if(!this['login/isAdmin']) { //выкидываем за шкирку НЕадмина;
        console.warn('Брысь отсюда! Ты не админ .!. ');
        this.$router.push( { name:'forum' } )
    } else */
    this.getCategories();
  },
  computed: {
      ...mapGetters([
          'login/isAdmin'
      ]),
      disabled() {
          return !this.form.name
      }
  },
  methods: {
    submit() {
      this.editSlug ? this.update() : this.create();
    },
    update() {

      axios
        .patch(`/category/${this.editSlug}`, this.form)
        .then(res => {
          this.categories.unshift({ ...res.data });
          this.form.name = null;
          this.editSlug = null;
        })
        .catch(err => console.warn(err));
    },
    create() {

      axios
        .post("/category", this.form)
        .then(res => {
          this.categories.unshift({ ...res.data });
          this.form.name = null;
        })
        .catch(err => {
            console.warn(err);
            this.errors = err.response.data.errors
        })

    },
    destroy(slug, index) {
      axios
        .delete(`/category/${slug}`)
        .then(res => this.categories.splice(index, 1))
        .catch(err => console.warn(err));
    },
    edit(index) {
        this.form.name = this.categories[index].name;
        this.editSlug = this.categories[index].slug;
        this.categories.splice(index, 1);
    },
    getCategories() {
        this.loading = true;
      axios
        .get("/category")
        .then(res => (this.categories = res.data.data))
        .catch(err => console.warn(err))
        .finally(() => this.loading = false)
    }
  }
};
</script>
