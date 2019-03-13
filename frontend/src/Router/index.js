import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
    {
        name:'main',
        meta: {
            title: 'Main Page - Forum App',
            metaTags: [
              {
                name: 'description of main page',
                content: 'The main page of our example app.'
              },
              {
                property: 'og:description',
                content: 'The content sections of main page of our forum app.'
              }
            ]
          },
        path: '/',
        component: ()=>import('@/components/parallex')
    },

    {
        name: "forum",
        meta: {title: 'Forum'},
        path: "/forum",
        component: () =>import("@/components/category/CategoryQuestions")// import("@/components/forum/forum")
    },
    {
        name: "CategoryQuestions",
        meta: {title: ':slug - Forum Category'},
        path: "/category/:slug",
        component: () => import("@/components/category/CategoryQuestions")
    },

    {
        name: "ask",
        meta: {title: 'Create question'},
        path: "/ask",
        component: () => import("@/components/forum/createTopic/create")
    },

    {
        name: "signup",
        meta: {title: 'Signup'},
        path: "/signup",
        component: () => import("@/components/login/Signup")
    },

    {
        name: "edit-categories",
        meta: {title: 'Edit categories'},
        path: "/edit-categories",
        component: () => import("@/components/category/EditCategories")
    },

    {
        name: "login",
        meta: {title: 'Login'},
        path: "/login",
        component: () => import("@/components/login/Login")
    },
    {
        name: "read",
        meta: {title: 'Article'},
        path: "/question/:slug",
        component: () => import("@/components/forum/read")
    },

    {
        path: '*',
        meta: {title: 'Page not found!'},
        component: () => import("@/components/NotFound")
    }
]



const router = new VueRouter ({
    routes,
    hashbang:false,
    mode: 'history'
});


// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
    next();
  });

export default router;
