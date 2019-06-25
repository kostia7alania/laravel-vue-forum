<template>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
      :color="color"
    > {{ text }}
      <v-btn
        color="pink"
        text
        @click="close"
      > Закрыть
      </v-btn>
    </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

  export default {
    data () {
      return {
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: 'Hello, I\'m a snackbar',
        color: 'info'
      }
    },

    mounted() {
        window.snack = (text='Attention', color='info') => {
            this.text = text
            this.color = color
            this['global/SET_SNACK_ON']()
        }
    },

    computed: {

      snackbar: {
          get() {
              return this.$store.state.global._snack
          },
          set(e) {
              e ? this['global/SET_SNACK_ON']():
              this['global/SET_SNACK_OFF']()
          }
      }

    },

    methods: {
        ...mapMutations([
            'global/SET_SNACK_ON',
            'global/SET_SNACK_OFF',
        ]),
        close(e) {
            this['global/SET_SNACK_OFF']()
        }
    },

  }
</script>
