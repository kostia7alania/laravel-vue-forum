<template>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg">
        <v-layout column align-center justify-center>
            <h1 class="white--text display-4 text-uppercase main-title">Форум</h1>
            <h4 class="white--text display-1 second-title">Сингл Пейдж Апликейшн</h4>
        </v-layout>
    </v-parallax>
</template>
<script>
export default {

}
</script>

<style lang="scss" scoped >
.main-title, .second-title {
    transition: 1s;
    cursor:pointer;
    &:active {
        color:red !important;
    }
}
.main-title {
    font-size: 20vh !important;
    &:hover {
        transform: translateX(111px);
    }
}
.second-title {
    font-size: 5vh !important;
    &:hover {
        transform: translateY(111px);
    }
}
.v-parallax {
    min-height: 50vh;
    max-height: 70vh !important;
}
</style>
