<template>
      <v-layout row wrap>
        <v-flex xs12>

          <v-text-field
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            label="E-mail"
            type="email"
            required
          />

        </v-flex>
      </v-layout>
</template>

<script>
export default {
  props: ["valid", "form"],
  data() {
    return {
      rules: {
        required: value => !!value || "Введите почту",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (pattern.test(value)) {
            this.valid.email = true;
            return true;
          } else {
            this.valid.email = false;
            return "Неверная почта";
          }
        }
      }
    };
  }
};
</script>
