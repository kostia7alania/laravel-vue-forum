<template>
  <div class="text-xs-center pos-rel">
    <v-alert class="alert-abs" :value="true" type="error" transition="scale-transition"> 404! Страница не найдена! </v-alert>
     <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-parallax>
  </div>
</template>

<script>
export default {
  name: "Page-Not-Found",
  data() {
    return {};
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.text-xs-center {
  background: dark;
}
.pos-rel {
  position: relative;
}
.alert-abs {

  text-align: center;
  position: absolute;
  z-index: 9;
  left: 39%;
  top: 38%;
  background: black;
  i {
      color: rgba(177, 143, 143, 0.822) !important;
  }
}
.v-parallax {
    height: 200px !important;
}
</style>
