import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/parks",
    name: "parks",
    component: () => import("./components/ParksList")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddPark")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;