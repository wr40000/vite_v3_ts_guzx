// 定义userlogin仓库的数据类型
import type { RouteRecordRaw } from "vue-router";
export interface UserStoreToken {
  token: string | null;
  constantRoutes: RouteRecordRaw[];
  username:string,
  avatar:string
}
