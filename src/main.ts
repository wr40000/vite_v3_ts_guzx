import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
//全局组件
import globalCompoents from "./components/globalCompoents";
//引入scss
import "@/styles/index.scss";
//引入路由
import router from "./router";
//引入pinia仓库
import { pinia } from "@/store";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(globalCompoents);
app.use(router);
app.use(pinia);
app.mount("#app");

// console.log(import.meta.env);
