export const saveToken = (token:string)=>{
    localStorage.setItem("TOKEN",token);
};
export const getToken = ()=>{
    return localStorage.getItem("TOKEN");
}