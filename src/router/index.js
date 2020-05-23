import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from "@/components/login/register"
import index from "@/components/view/index"
import map from "@/components/homepage/map"
import meua from "@/components/meualist/meua"
import equipstatus from "@/components/meualist/equipstatus"
import detailChart from "@/components/meualist/detailChart"
import ruleLine from "@/components/meualist/ruleLine"
import warning from "@/components/meualist/warning"
import information from "@/components/meualist/information"
import debug from "@/components/meualist/debug"
import management from "@/components/meualist/management"
import history from "@/components/meualist/history"
import faraway from "@/components/meualist/faraway"
import main from "@/components/homepage/main"
import statusinfo from "@/components/departs/statusinfo"
import addCustomer from "@/components/customer/addcustomer"
import configCenter from "@/components/user/configCenter"
import personalUser from "@/components/user/personalUser"


Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'home',
        redirect: '/login'
    }, {
        path: '/register',
        name: 'register',
        component: register,
    }, {
        path: '/login',
        name: 'login',
        component: login,
    }, {
        path: '/configCenter',
        name: 'configCenter',
        component: configCenter,
    },{
        path: '/personalUser',
        name: 'personalUser',
        component: personalUser,
    },{
        path: '/index',
        name: 'index',
        component: index,
    }, {
        path: '/map',
        name: 'map',
        component: map,
    }, {
        path: '/main',
        name: 'main',
        component: main,
    }, {
        path: '/meua',
        name: 'meua',
        component: meua,
        children: [{
            path: '/equipstatus',
            component: equipstatus
        }, {
            path: '/detailChart',
            component: detailChart
        }, {
            path: '/ruleLine',
            component: ruleLine
        }, {
            path: '/warning',
            component: warning
        }, {
            path: '/information',
            component: information
        }, {
            path: '/debugging',
            component: debug
        }, {
            path: '/management',
            component: management
        }, {
            path: '/addCustomer',
            component: addCustomer
        },{
            path: '/history',
            component: history
        }, {
            path: '/faraway',
            component: faraway
        }, {
            path: 'statusinfo',
            component: statusinfo
        }]
    }]
})