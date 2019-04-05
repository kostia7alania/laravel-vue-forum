<template>
    <div>
    <toolbar></toolbar>
    <router-view></router-view>
    <snack/>
    <app-footer></app-footer>
   </div>
</template>

<script>
import toolbar from './Toolbar'
import snack from '@/components/global/snack'
import AppFooter from './AppFooter'
export default {
name: "APP__HOME",
 components: { toolbar,AppFooter, snack }
}
</script>
