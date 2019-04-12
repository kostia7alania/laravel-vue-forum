<template>
<div>
    LOGGING OUT....
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'login/logout'
        ])
    },
    mounted() {
        window.t = this;
        console.warn('BEFORE logging OUT')
        window.setTimeout(() => {
            console.warn('logging OUT')
            this['login/logout']();//delete token in localStorage + Vuex;
        }, 1000);

    }

}
</script>
