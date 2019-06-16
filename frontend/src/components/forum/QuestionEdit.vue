<template>
   <v-container fluid>
        <v-card>

            <v-form @submit.prevent="update">

                <v-text-field maxlength=200 label="Тема" class="pl-3 pr-3" v-model.trim="form.title" type="text" required>
                </v-text-field>

                <markdown-editor v-model.trim="form.body"></markdown-editor>

            <v-card-actions class="text-xs-center d-flex align-center">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" v-on="on" type="submit">
                                <v-icon color="orange">save</v-icon>
                                Сохранить
                            </v-btn>
                        </template>
                        <span>Сохранить правки</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn  color="primary" dark v-on="on" @click="cancel">
                                <v-icon color="red">cancel</v-icon>
                                Отменить
                            </v-btn>
                        </template>
                        <span>Выйти без сохранения</span>
                    </v-tooltip>

            </v-card-actions>


            </v-form>
        </v-card>
   </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "edit-question",
  props: ["question"],
  data() {
    return {
      form: {
        title: null,
        body: null
      }
    };
  },
  mounted() {
    this.form = this.question;
  },
  methods: {
    ...mapActions(["question/questionUpdate"]),
    cancel() {
      EventBus.$emit("cancelEditing");
    },
    update() {
      this["question/questionUpdate"](this.form)
        .then(res => this.cancel())
        .catch(err => console.warn(err));
    }
  }
};
</script>
