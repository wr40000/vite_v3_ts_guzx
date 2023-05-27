export const constantRoute = [
    //Login
    {
      path: "/",
      component: () => import("@/views/login/index.vue"),
      name: "login",
      meta: {
        title: "登录",
        hidden: true,
        icon: "Position",
      },
    },
  //layout
  {
    path: "/layout",
    //component的写法需要注意
    component: () => import("@/layout/index.vue"),
    name: "layout",
    redirect: "/layout/hellow",
    meta: {
      title: "主页",
      hidden: true,
      icon: "House",
    },
    children: [
      {
        path: "/layout/hellow",
        name: "hellow",
        component: () => import("@/views/welcome/index.vue"),
        meta: {
          title: "你好",
          hidden: true,
          icon: "Guide",
        },
      },
      {
        path: "/layout/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "个人中心",
          hidden: true,
          icon: "Pointer",
        },
      },
      {
        path: "/layout/power",
        name: "Power",
        component: () => import("@/views/power/index.vue"),
        meta: {
          title: "权限",
          hidden: true,
          icon: "Lock",
        },
      },
    ],
  },
  //404
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: false,
    },
  },
  //Any
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "Any",
      hidden: false,
    },
  },
  //数据可视化
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      hidden: true,
      title: "数据可视化",
      icon: "DataLine",
    },
  },
  //权限管理
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    name: "Acl",
    meta: {
      hidden: true,
      title: "权限管理",
      icon: "Lock",
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/acl/user/index.vue"),
        name: "Acl",
        meta: {
          hidden: true,
          title: "用户管理",
          icon: "User",
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/acl/role/index.vue"),
        name: "Role",
        meta: {
          hidden: true,
          title: "角色管理",
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/permission",
        component: () => import("@/views/acl/permission/index.vue"),
        name: "Permission",
        meta: {
          hidden: true,
          title: "菜单管理",
          icon: "Grid",
        },
      },
    ],
  },
  //商品管理
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    meta: {
      hidden: true,
      title: "商品管理",
      icon: "Goods",
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          hidden: true,
          title: "品牌管理",
          icon: "ShoppingCartFull",
        },
      },
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          hidden: true,
          title: "属性管理",
          icon: "PriceTag",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          hidden: true,
          title: "Spu管理",
          icon: "Calendar",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          hidden: true,
          title: "Sku管理",
          icon: "Paperclip",
        },
      },
    ],
  },
];
