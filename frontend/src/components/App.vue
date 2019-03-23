<template>
    <v-app class="app">
        <toolbar></toolbar>
        <router-view></router-view>
        <snack/>
        <foot-app></foot-app>
   </v-app>
</template>

<script>
import toolbar from './Toolbar'
import snack from '@/components/global/snack'
import AppFooter from './AppFooter'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: "APP__HOME",
    components: { toolbar,'foot-app': AppFooter, snack },
    computed: {
        ...mapGetters([ 'login/TOKEN__isOK' ])
    },
    created() {
        window.app = this;
        if( !this['login/TOKEN__isOK']) this['login/logout']();
    },
    methods: {
        ...mapActions([ 'login/logout' ])
    }
}
</script>

<style>
.app {
    height: 100%;;
}
</style>

