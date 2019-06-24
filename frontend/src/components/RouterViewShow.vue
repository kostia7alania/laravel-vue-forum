<template>
        <keep-alive max="1">
            <transition name="fade">
                <router-view :key="$route.fullPath"/>
            </transition>
        </keep-alive>
</template>

<script>
export default {
  name: "router_view_show"
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

