import { defineStore } from "pinia";

let HomeStore = defineStore("HomeStore", {
  state: () => {
    return {
      imageArray: [],
    };
  },
  actions: {
    async getAllImagesFromFolder() {
      const images: any = [];
      const folderPath = import.meta.glob("@/assets/cam_img/*.png");

      for (const path in folderPath) {
        const imagePath: any = await folderPath[path]();
        images.push(imagePath.default);
      }
      this.imageArray = images;
    },
  },

  getters: {},
});

export default HomeStore;
