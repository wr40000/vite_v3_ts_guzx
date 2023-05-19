export const constantRoute = [
  {
    path: "/layout",
    //component的写法需要注意
    component: () => import("@/layout/index.vue"),
    name: "layout",
  },
  {
    path: "/",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
