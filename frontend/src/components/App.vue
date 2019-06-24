<template>
    <v-app class="app">
        <toolbar></toolbar>

        <router-view-show/>

        <snack/>
        <v-spacer></v-spacer>
        <foot-app></foot-app>
   </v-app>
</template>

<script>
import toolbar from "./Toolbar";
import snack from "@/components/global/snack";
import AppFooter from "./AppFooter";
import RouterViewShowVue from "./RouterViewShow.vue";

export default {
  name: "APP__HOME",
  components: {
    toolbar,
    "foot-app": AppFooter,
    snack,
    "router-view-show": RouterViewShowVue
  }
};
</script>

<style>
.app {
  height: 100%;
}
</style>

