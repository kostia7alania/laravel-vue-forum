import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
    {
        name: "Forum",
        path: "/forum",
        component: () => import("@/components/login/Login")
    },
    {
        name: "Login",
        path: "/login",
        component: () => import("@/components/login/Login")
    }
]
const router = new VueRouter ({
    routes,
    hashbang:false,
    mode: 'history'
});

export default router;