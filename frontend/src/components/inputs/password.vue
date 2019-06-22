<template>
    <v-text-field
        v-model="model"
        :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        :label="passLabel"
        :hint="hint"
        counter
        @click:append="show1 = !show1"
    ></v-text-field>
</template>

<script>

  export default {
    props: ['valid', 'form', 'min', 'confirm', 'error'],
    data () {
      return {
        show1: false,
        rules: {
          required: value => !!value || 'Обязательное поле.',
          min: v => {
            if(this.min > v.length) {
                this.confirm ? this.valid.password_confirmation = false
                                    : this.valid.password = false
                return `Минимум - ${this.min} символов`
            }
            if(this.confirm && this.form.password_confirmation != this.form.password) {
                this.confirm ? this.valid.password_confirmation = false
                                    : this.valid.password = false
                return `Пароли не совпадают`
            }
             this.confirm ? this.valid.password_confirmation = true
                                    : this.valid.password = true
          }
        },
      }
    },
    computed: {
        model: {
            get() {
                return this.confirm && this.form.password_confirmation
                       || this.form.password
            },
            set(e) {
                this.confirm ? this.form.password_confirmation = e
                     : this.form.password = e
            }
        },
        passLabel() { return this.confirm ? 'Подтверждение пароля' : 'Пароль' },
        hint() { return `Минимум символов: ${this.min}` }
    },
  }
</script>
