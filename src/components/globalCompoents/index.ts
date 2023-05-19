import SvgIcon from "@/components/SvgIcons/index.vue";

const allglobalCompoents = { SvgIcon };
export default {
  install(app: any) {
    Object.keys(allglobalCompoents).forEach((key) => {
      app.component(key, allglobalCompoents[key]);
    });
  },
};
