import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../Store';

Vue.use(VueRouter)

const routes = [{
    name: 'main',
    meta: {
        title: 'Главная страница форума',
        metaTags: [{
            name: 'description of main page',
            content: 'The main page of our example app.'
        },
        {
            property: 'og:description',
            content: 'The content sections of main page of our forum app.'
        }
        ],
    },
    path: '/',
    component: () => import('@/components/parallex')
},

{
    name: "forum",
    meta: {
        title: 'Форум',
        metaTags: [
            {
                name: 'Описание форума',
                content: 'Тестовый форум на VUE.js 2.6 и LARAVEL 5.8'
            },
            {
                property: 'og:description',
                content: 'Текстовая секция странички'
            }
        ],
    },
    path: "/forum",
    component: () => import("@/components/category/CategoryQuestions"), // import("@/components/forum/forum")
    props: true

},
{
    name: "CategoryQuestions",
    meta: {
        title: 'Вопросы по категориям',
        metaTags: [
            {
                name: 'Вопросы по категориям',
                content: 'Тестовый форум на VUE.js 2.6 и LARAVEL 5.8 / Вопросы по категориям'
            },
            {
                property: 'og:description',
                content: 'Текстовая секция странички / Вопросы по категориям'
            }
        ],
    },
    path: "/category/:slug",
    component: () => import("@/components/category/CategoryQuestions")
},

{
    name: "ask",
    meta: {
        title: 'Создать вопрос',
    },
    path: "/ask",
    component: () => import("@/components/forum/createTopic/create")
},

{
    name: "edit-categories",
    meta: {
        title: 'Редактор категорий'
    },
    path: "/edit-categories",
    component: () => import("@/components/category/EditCategories")
},

{
    name: "signup",
    meta: {
        title: 'Регистрация',
    },
    path: "/signup",
    component: () => import("@/components/login/Signup")
},

{
    name: "login",
    meta: {
        title: 'Вход'
    },
    path: "/login",
    component: () => import("@/components/login/Login")
},
{
    name: "read",
    meta: {
        title: 'Топик'
    },
    path: "/question/:slug",
    component: () => import("@/components/forum/read")
},

{
    path: '*',
    meta: {
        title: 'Страница не найдена!'
    },
    component: () => import("@/components/NotFound")
}
]


const router = new VueRouter({
    routes,
    hashbang: false,
    mode: 'history'
});

router.beforeEach(async (to, from, next) => {
    store.state.global.slug = to.params && to.params.slug

    if (await store._actions["login/checkPermitionsOnCurrentPath"][0](to.path)) {
        console.warn('ROUTER: есть права')
        next();
    } else {
        console.warn('ROUTER: нет прав')
        next({ name: 'forum' });
    }
    next();
});

router.afterEach(async (to, from) => {
    const slug = store.state.global.slug

    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title + ` ${slug ? ' - ' + slug : ''}`;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return;

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => tag.setAttribute(key, tagDef[key]));
        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));
});

export default router;
