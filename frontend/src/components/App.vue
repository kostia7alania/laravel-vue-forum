<template>
    <v-app class="app">
        <toolbar></toolbar>

        <keep-alive max="1">
            <transition name="fade">
                <router-view :key="$route.fullPath"/>
            </transition>
        </keep-alive>

        <snack/>
        <v-spacer></v-spacer>
        <foot-app></foot-app>
   </v-app>
</template>

<script>
import toolbar from "./Toolbar";
import snack from "@/components/global/snack";
import AppFooter from "./AppFooter";

export default {
  name: "APP__HOME",
  components: {
    toolbar,
    "foot-app": AppFooter,
    snack
  }
};
</script>

<style>
.app {
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

