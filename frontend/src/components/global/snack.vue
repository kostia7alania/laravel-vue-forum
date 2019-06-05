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
        @click="snackbar = false"
      > Закрыть
      </v-btn>
    </v-snackbar>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
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
            this.text = text;
            this.color = color;
            this.snackbar = true;
        }
    }
  }
</script>
