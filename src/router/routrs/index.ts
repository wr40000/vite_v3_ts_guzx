export const constantRoute = [
  {
    path: "/home",
    //component的写法需要注意
    component: () => import("@/views/home/index.vue"),
    name: "home",
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
