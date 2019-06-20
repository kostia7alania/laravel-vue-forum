<template>
   <v-container>
       <v-form @submit.prevent="create">
           <span class="red--text" v-if="errors.title">{{ errors.title[0] }}</span>
           <span class="red--text" v-if="errors.slug">{{ errors.slug[0] }}</span>
           <v-text-field label="Название" v-model.trim="form.title" type="text" required>
           </v-text-field>

            <categories :form='form'/>

            <span class="red--text" v-if="errors.body">{{ errors.body[0] }}</span>
            <markdown-editor v-model.trim="form.body" ref="markdownEditor"></markdown-editor>

            <v-btn color="green" type="submit" :disabled="disabled">
                 <v-progress-circular v-if="loading" :width="7" color="purple" indeterminate ></v-progress-circular>
                <v-icon v-else>note_add</v-icon>
                Создать
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
  name: "create-topic-create",
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
          snack("Тема успешно создана", "success");
        })
        .catch(error => {
          console.log("ERRR=>", error);
          if(error.message == 'Network Error') {
                snack("Сетевая ошибка!", "error");
            } else if (error.error&&error.error.match("Token is")) {
            snack("Пожалуйста, авторизуйтесь!", "error");
            this["login/logout"]();
          } else {
            snack("Ошибка при создании темы", "error");
            this.errors = error.response.data.errors;
          }
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

