import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
    {
        name: "login",
        path: "/login",
        component: () => import("@/components/login/Login")
    },
    {
        name: "logout",
        path: "/logout",
        component: () => import("@/components/login/Logout")
    },
    {
        name: "signup",
        path: "/signup",
        component: () => import("@/components/login/Signup")
    },
    {
        name: "category",
        path: "/category",
        component: () => import("@/components/category/CreateCategory")
    },
    {
        name: "forum",
        path: "/forum",
        component: () => import("@/components/forum/forum")
    },
    {
        name: "read",
        path: "/question/:slug",
        component: () => import("@/components/forum/read")
    },
    {
        name: "ask",
        path: "/ask",
        component: () => import("@/components/forum/create")
    },
    {
        path: '*',
        component: () => import("@/components/NotFound")
    }
]
const router = new VueRouter ({
    routes,
    hashbang:false,
    mode: 'history'
});

export default router;
