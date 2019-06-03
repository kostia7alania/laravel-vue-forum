import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        theme: {
            dark: true,
            themes: {
                light:{ primary: '#42a5f5' },
                dark: { primary: '#2196F3' },
            },
        },
        options: { customProperties: true },
        iconfont: 'mdi',
    },
});
