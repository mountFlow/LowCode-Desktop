//router.js
import * as vueRouter from "vue-router";
import Home from "../views/Home.vue";
import Design from "../views/Design.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/design",
    name: "Design",
    component: Design
  }
];

const router = vueRouter.createRouter({
  history: vueRouter.createWebHistory(),
  routes: routes
});

export default router;