<template>
   <v-container fluid>
        <v-card>

            <v-form @submit.prevent="update">

                <v-text-field label="Title" v-model.trim="form.title" type="text" required>
                </v-text-field>

                <markdown-editor v-model.trim="form.body"></markdown-editor>

                <v-card-actions>
                    <v-btn icon small type="submit">
                        <v-icon color="teal">save</v-icon>
                    </v-btn>

                    <v-btn icon small @click="cancel">
                        <v-icon>cancel</v-icon>
                    </v-btn>

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
