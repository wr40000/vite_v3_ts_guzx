import {createRouter, createWebHashHistory} from 'vue-router'

let router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/home',
            component:()=>{import('@/views/home/index.vue')},
            name:"home"
        },
        {
            path:'/login',
            component:()=>{import('@/views/login/index.vue')},
            name:"login"
        },
        {
            path:'/404',
            component:()=>{import('@/views/404/index.vue')},
            name:"404"
        },
    ]
})