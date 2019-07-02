<template>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
              label="Имя"
              v-model="form.name"
              type="text"
              :rules="[rules.required, rules.min]"
              required
              :error-messages="hint"
              :error="!valid.name && showErrors"
          />
        </v-flex>
      </v-layout>
</template>

<script>
export default {
  name: "name-input",
  props: ["valid", "form", "min"],
  data() {
    return {
      showErrors: false,
      rules: {
        required: v => !!v || "Обязательное поле.",
        min: v => {
          const m = this.min || 1;
          return (m > v.length && `Минимум символов: ${m}`) || true;
        }
      }
    };
  },
  watch: {
    model() {
      this.showErrors = true;
    }
  },
  computed: {
    model: {
      get() {
        return this.form.name;
      },
      set(e) {
        this.form.name = e.replace(/\s+/g, " ").trim();
      }
    },
    hint() {
      if (!this.showErrors) return "";
      const minTest = this.minTest("name");
      if (minTest) return minTest;
      this.valid.name = true;
      return "";
    }
  },

  methods: {
    minTest(name) {
      if ((this.min || 1) > this.form[name].length) {
        this.valid[name] = false;
        return `Минимум символов - ${this.min}`;
      }
    }
  }
};
</script>
