import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Catalog from "@/views/Catalog.vue";
import BookDetail from "@/views/BookDetail.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/book/:id",
    name: "BookDetail",
    component: BookDetail,
    props: true,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/catalog",
    name: "Catalog",
    component: Catalog,
  },
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("token");

  if (to.path === "/" && isLoggedIn) {
    next("/catalog");
  } else {
    next();
  }
});

export default router;
