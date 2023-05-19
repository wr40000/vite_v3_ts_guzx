//统一管理咱们项目用户相关的接口

import request from "@/utils/requests.ts";

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from "./type";

//项目用户相关的请求地址

enum API {
  LOGIN_URL = "user/login",

  USERINFO_URL = "user/info",

  LOGOUT_URL = "/admin/acl/index/logout",
}
//登录接口
export const reqLogin = (data: loginFormData) =>
  // <any, loginResponseData> 表明了 reqLogin 函数返回的 Promise 对象的类型。
  // 即该函数在请求成功时返回的数据类型应该符合 loginResponseData 接口的定义。
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息

export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL);

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL);
