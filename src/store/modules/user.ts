import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginFormData } from "@/api/user/type";
import type { UserStoreToken } from "./type/type";
import { saveToken } from "@/utils/tokens";
import { getToken } from "@/utils/tokens";
import { constantRoute } from "@/router/routrs";
import { reqUserInfo } from "@/api/user";

let useUserStore = defineStore("useUserStore", {
  state: (): UserStoreToken => {
    return {
      // token:localStorage.getItem("TOKEN"),
      token: getToken(),
      constantRoutes: constantRoute,
      username: "",
      avatar: "",
    };
  },
  actions: {
    async userLogin(data: loginFormData) {
      let login_msg = await reqLogin(data);
      if (login_msg.code == 200) {
        this.token = login_msg.data.token as string;
        // localStorage.setItem("TOKEN",login_msg.data.token);
        saveToken(login_msg.data.token);
        return "OK";
      } else {
        return Promise.reject(new Error(login_msg.data.message));
      }
    },

    //获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo();
      // console.log(result);
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
      }
    },
  },
  getters: {},
});

export default useUserStore;
