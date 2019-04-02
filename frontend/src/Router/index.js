import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
    {
        name: "Login",
        path: "/login",
        component: () => import("@/components/login/Login")
    }
]
const router = new VueRouter ({
    routes
});

export default router;