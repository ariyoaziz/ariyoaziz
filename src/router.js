import { createRouter, createWebHistory } from "vue-router";
import Home from "../src/components/home.vue"; // Home sekarang adalah halaman single-page Anda

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
