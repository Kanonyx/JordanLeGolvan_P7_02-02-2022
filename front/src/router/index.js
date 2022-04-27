import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/LoginVue.vue";
import Signup from "@/components/SignUp.vue";
import Posts from "@/components/PostsVue.vue";
import Profil from "@/components/ProfilVue.vue";
import Users from "@/components/UsersVue.vue";
import PageNotFound from "@/components/PageNotFound.vue";


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      // Default page
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      // SignUP page
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      // Get all posts
      path: "/posts",
      name: "Posts",
      component: Posts,
    },
    {
      // Get profil id
      path: "/profil/:id",
      name: "Profil",
      component: Profil,
    },
    {
      // Get all users
      path: "/users",
      name: "Users",
      component: Users,
    },
    {
      // Vue2 required to catchAll *
      // 404 error PageNotFound
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: PageNotFound,
      meta: {
        requiresAuth: false
      }
    },
    {
      // Vue2 required to catchAll *
      // 404 error PageNotFound
      path: "/profil/:id-:afterUser(.*)",
      name: "NotFound",
      component: PageNotFound,
      meta: {
        requiresAuth: false
      }
    },  
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.name
  next()
});

export default router;
