import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("useLayoutSettingStore", {
  state: () => {
    return {
      fold: false,
      refsh: false,
    };
  },
});

export default useLayoutSettingStore;
