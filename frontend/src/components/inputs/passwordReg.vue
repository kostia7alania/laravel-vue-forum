<template>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
              v-model="form.password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules1.required, rules1.min]"
              label="Пароль"
              :error-messages="hint1"
              :error="!valid.password && showErrors1"
              counter
        />
        </v-flex>

        <v-flex xs12 sm6 >
          <v-text-field
            v-model="form.password_confirmation"
            :append-icon="show2 ? 'visibility' : 'visibility_off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            :rules="[rules2.required, rules2.min]"
            label="Подтверждение пароля"
            :error-messages="hint2"
            counter
            :error="!valid.password_confirmation && showErrors2"
          />
        </v-flex>
      </v-layout>
</template>

<script>
export default {
  props: ["valid", "form", "min"],
  data() {
    return {
      show1: false,
      show2: false,
      showErrors1: false,
      showErrors2: false,
      rules1: {
        required: value => !!value || "Обязательное поле.",
        min: v => {
          return (
            (this.min > v.length && `Минимум символов: ${this.min}`) || true
          );
        }
      },
      rules2: {
        required: value => !!value || "Обязательное поле.",
        min: v => {
          return (
            (this.min > v.length && `Минимум символов: ${this.min}`) || true
          );
        }
      }
    };
  },
  watch: {
    "form.password"(neww, old) {
      this.showErrors1 = true;
    },
    "form.password_confirmation"(neww, old) {
      this.showErrors2 = true;
    }
  },
  computed: {
    hint1() {
      if (!this.showErrors1) return "";
      const minTest = this.minTest("password");
      if (minTest) return minTest;

      this.valid.password = true;
      return "";
    },

    hint2() {
      if (!this.showErrors2) return "";
      const minTest = this.minTest("password_confirmation");
      if (minTest) return minTest;

      if (this.form.password != this.form.password_confirmation) {
        this.valid.password_confirmation = false;
        return `Пароли не совпадают`;
      }
      this.valid.password_confirmation = true;
      return "";
    }
  },
  methods: {
    minTest(name) {
      if (this.min > this.form[name].length) {
        this.valid[name] = false;
        return `Минимум символов - ${this.min}`;
      }
    }
  }
};
</script>
