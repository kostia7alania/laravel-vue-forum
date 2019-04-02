import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
    {
        name: "forum",
        path: "/forum",
        component: () => import("@/components/forum/forum")
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/components/login/Login")
    },
    {
        name: "signup",
        path: "/signup",
        component: () => import("@/components/login/Signup")
    },
    {
        name: "logout",
        path: "/logout",
        component: () => import("@/components/login/Logout")
    }
]
const router = new VueRouter ({
    routes,
    hashbang:false,
    mode: 'history'
});

export default router;