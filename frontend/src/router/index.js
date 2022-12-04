import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

let opts = {
  routes: [
    {
      path: "/",
      name: "AnalyzersView",
      component: () => import("../views/AnalyzersView.vue"),
    },
  ],
  linkExactActiveClass: "active",
};
const router = new VueRouter(opts);

export default router;
