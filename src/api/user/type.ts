export interface loginFormData {
  username: string;
  password: string;
}
interface datatype {
  token: string;
  message: string;
}

export interface loginResponseData {
  code: Number;
  data: datatype;
  token: string;
}

interface userinfo {
  userId: Number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: [];
  buttons: [];
  routes: [];
  token: string;
}

interface user {
  checkUser: userinfo;
}

export interface userInfoReponseData {
  code: Number;
  data: user;
}
