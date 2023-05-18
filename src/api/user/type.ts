export interface loginFormData{
    username: String,
    password: String,
    token:String
}
interface datatype{
    token:String
}

export interface loginResponseData{
    code: Number, 
    data: datatype
}

interface userinfo{
    userId:Number,
    avatar:String,
    username:String,
    password: String,
    desc: String,
    roles: [],
    buttons: [],
    routes: [],
    token: string
}

interface user{
    checkUser:userinfo,
}

export interface userInfoReponseData{
    code:Number,
    data:user
}