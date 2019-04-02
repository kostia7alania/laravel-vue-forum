<template>
    <div>
    <toolbar></toolbar>
    <app-footer></app-footer>
   </div>
</template>

<script>
import toolbar from './Toolbar'

import AppFooter from './AppFooter'
export default {
name: "APP__HOME",
 components: { toolbar,AppFooter }
}
</script>
