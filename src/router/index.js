import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from "@/components/login/register"
import index from "@/components/view/index"
import map from "@/components/homepage/map"
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/register',
        name: 'register',
        component: register,
    }, {
        path: '/login',
        name: 'login',
        component: login,
    }, {
        path: '/index',
        name: 'index',
        component: index,
    }, {
        path: '/map',
        name: 'map',
        component: map,
    }]
})