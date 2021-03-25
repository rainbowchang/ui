import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login/login'
// import register from "@/components/login/register"
// import index from "@/components/view/index"
// import map from "@/components/homepage/map"
// import meua from "@/components/meualist/meua"
// import equipstatus from "@/components/meualist/equipstatus"
// import detailChart from "@/components/meualist/detailChart"
// import ruleLine from "@/components/meualist/ruleLine"
// import warning from "@/components/meualist/warning"
// import information from "@/components/meualist/information"
// import debug from "@/components/meualist/debug"
// import management from "@/components/meualist/management"
// import history from "@/components/meualist/history"
// import faraway from "@/components/meualist/faraway"
// import main from "@/components/homepage/main"
// import statusinfo from "@/components/departs/statusinfo"
// import addCustomer from "@/components/customer/addcustomer"
// import configCenter from "@/components/user/configCenter"
// import personalUser from "@/components/user/personalUser"


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
        redirect: '/login',
       
    }, {
        path: '/register',
        name: 'register',
        // component: register,
        component: resolve => require(['@/components/login/register'], resolve)
    }, {
        path: '/deviceHome',
        name: 'deviceHome',
        // component: register,
        component: resolve => require(['@/components/test/deviceHome'], resolve)
    },{
        path: '/login',
        name: 'login',
       // component: login,
        component: resolve => require(['@/components/login/login'], resolve)
    }, {
        path: '/qrhome',
        name: 'qrhome',
        // component: login,
        component: resolve => require(['@/components/qrcode/qrhome'], resolve)
    },{
        path: '/qrioshome',
        name: 'qrioshome',
        // component: login,
        component: resolve => require(['@/components/qrcode/qrioshome'], resolve)
    }, {
        path: '/qrdownload',
        name: 'qrdownload',
        // component: login,
        component: resolve => require(['@/components/qrcode/qrdownload'], resolve)
    },{
        path: '/download_form',
        name: 'download_form',
        // component: login,
        component: resolve => require(['@/components/qrcode/download_form'], resolve)
    },{
        path: '/download_home',
        name: 'download_home',
        component: resolve => require(['@/components/qrcode/download_home'], resolve)
    },{
        path: '/configCenter',
        name: 'configCenter',
        // component: configCenter,
        component: resolve => require(['@/components/user/configCenter'], resolve)
    },{
        path: '/personalUser',
        name: 'personalUser',
        // component: personalUser,
        component: resolve => require(['@/components/user/personalUser'], resolve)
    },{
        path: '/index',
        name: 'index',
        // component: index,
        component: resolve => require(['@/components/view/index'], resolve)
    }, {
        path: '/map',
        name: 'map',
        // component: map,
        component: resolve => require(['@/components/homepage/map'], resolve)
    }, {
        path: '/main',
        name: 'main',
        // component: main,
        component: resolve => require(['@/components/homepage/main'], resolve)
    }, {
        path: '/meua',
        name: 'meua',
        // component: meua,
        component: resolve => require(['@/components/meualist/meua'], resolve),
        children: [{
            path: '/equipstatus',
            // component: equipstatus
            component: resolve => require(['@/components/meualist/equipstatus'], resolve)
        }, {
            path: '/detailChart',
            // component: detailChart
            component: resolve => require(['@/components/meualist/detailChart'], resolve)
        }, {
            path: '/ruleLine',
            // component: ruleLine
            component: resolve => require(['@/components/meualist/ruleLine'], resolve)
        }, {
            path: '/warning',
            // component: warning
            component: resolve => require(['@/components/meualist/warning'], resolve)
        }, {
            path: '/information',
            // component: information
            component: resolve => require(['@/components/meualist/information'], resolve)
        }, {
            path: '/debugging',
            // component: debug,
            component: resolve => require(['@/components/meualist/debug'], resolve)
        }, {
            path: '/management',
            // component: management
            component: resolve => require(['@/components/meualist/management'], resolve)
        }, {
            path: '/addCustomer',
            // component: addCustomer
            component: resolve => require(['@/components/customer/addcustomer'], resolve)
        },{
            path: '/history',
            // component: history
            component: resolve => require(['@/components/meualist/history'], resolve)
        }, {
            path: '/faraway',
            // component: faraway
            component: resolve => require(['@/components/meualist/faraway'], resolve)
        }, {
            path: 'statusinfo',
            // component: statusinfo
            component: resolve => require(['@/components/departs/statusinfo'], resolve)
        }]
    }]
})