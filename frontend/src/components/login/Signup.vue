<template>
    <v-container>
        <v-form @submit.prevent="signup">
            <name :valid="valid" :form="form" :min='1'/>

            <span class="red--text" v-if="errors.name">{{ errors.name[0] }}</span>

            <email :valid="valid" :form="form"/>
            <span class="red--text" v-if="errors.email">{{ errors.email[0] }}</span>

            <password :valid="valid" :form="form" min='2'/>
            <span class="red--text" v-if="errors.password">{{ errors.password[0] }}</span>


            <v-btn :disabled='!isFormValid' color="green" type="submit">
                 <v-icon>done_outline</v-icon>
                 Зарегистрироваться
            </v-btn>
            <v-btn @click="toLoginHandler" color="blue" class="ml-2"> <v-icon>person</v-icon>Войти</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import emailVue from "../inputs/email.vue";
import passwordVue from "../inputs/passwordReg.vue";
import nameVue from "../inputs/name.vue";

export default {
  components: { email: emailVue, password: passwordVue, name: nameVue },
  name: "sign-up",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      valid: {
        name: null,
        email: false,
        password: false,
        password_confirmation: false
      },
      errors: {}
    };
  },
  mounted() {
    if (this["login/loggedIn"]) this.goHome();
  },
  computed: {
    ...mapState(["toolbar/modalMode"]),
    ...mapGetters(["login/loggedIn"]),
    modalMode() {
      return this.$store.state.toolbar.modalMode;
    },
    isFormValid() {
      const name = this.valid.name;
      const email = this.valid.email;
      const password = this.valid.password;
      const password_confirmation = this.valid.password_confirmation;
      return name && email && password && password_confirmation;
    }
  },
  destroyed() {
    this.$emit("toLoginMode");
  },
  methods: {
    ...mapMutations(["toolbar/SET_MODAL_MODE_OFF"]),
    ...mapActions(["login/register"]),
    goHome() {
      this.$router.push("/forum");
    },
    async signup() {
      const password = this.form.password;
      const password_confirmation = this.form.password_confirmation;
      if (password != password_confirmation)
        return snack("Пароли не совпадают!", "error");

      const res = await this["login/register"](this.form);
      if (res == true) {
        const m = this.modalMode;
        if (!m) this.goHome();
        this["toolbar/SET_MODAL_MODE_OFF"]();
      } else if (!res)
        snack("Возникла сетевая ошибка во время регистрации", "error");
      else {
        this.errors = res;
        snack("Возникли ошибки во время регистрации", "error");
      }
    },
    toLoginHandler() {
      if (!this.modalMode) this.$router.push({ name: "login" });
      this.$emit("toLoginMode");
    }
  }
};
</script>
