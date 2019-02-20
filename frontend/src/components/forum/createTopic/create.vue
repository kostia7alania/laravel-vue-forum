<template>
   <v-container>
       <v-form @submit.prevent="create">

           <span class="red--text" v-if="errors.title">{{ errors.title[0] }}</span>
           <v-text-field label="Title" v-model.trim="form.title" type="text" required>
           </v-text-field>

            <categories :form='form'/>

            <span class="red--text" v-if="errors.body">{{ errors.body[0] }}</span>
            <markdown-editor v-model.trim="form.body" ref="markdownEditor"></markdown-editor>

            <v-btn color="green" type="submit" :disabled="disabled">
                 <v-progress-circular v-if="loading" :width="7" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else>note_add</v-icon>
                Create
            </v-btn>
           <span class="red--text" v-if="errors.category_id">{{ errors.category_id[0] }}</span>

       </v-form>
   </v-container>
</template>

<script>
import { mapActions } from "vuex";
import categories from "./categories-autocomplete";
import markdownEditor from "vue-simplemde/src/markdown-editor";

export default {
  name: "create-topik-create",
  components: { categories, markdownEditor },
  data() {
    return {
      loading: null,
      form: {
        title: null,
        category_id: null,
        body: null
      },
      errors: {}
    };
  },
  computed: {
    disabled() {
      return !this.form.title || !this.form.body || !this.form.category_id || this.loading
    }
  },
  methods: {
    ...mapActions(["login/logout", "question/createQuestion"]),
    create() {
      this.loading = true;
      this["question/createQuestion"](this.form)
        .then(res => {
          this.$router.push(res.data.path);
          snack("Topic is successfully created", "success");
        })
        .catch(error => {
          console.log("ERRR=>", error);
          if (error.error.match("Token is")) {
            snack("Error! Please login", "error");
            this["login/logout"]();
          } else {
            snack("Error while creating the topic", "error");
            this.errors = error.response.data.errors;
          }
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

