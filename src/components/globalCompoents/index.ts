import SvgIcon from "@/components/SvgIcons/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue"; //elm的所有icon注册为全局组件

const allglobalCompoents: Record<string, any> = { SvgIcon };
export default {
  install(app: any) {
    Object.keys(allglobalCompoents).forEach((key: string) => {
      app.component(key, allglobalCompoents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
