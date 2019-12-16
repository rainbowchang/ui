import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import register from "@/components/login/register"
import index from "@/components/view/index"
import map from "@/components/homepage/map"
import meua from "@/components/meualist/meua"
import equipstatus from "@/components/meualist/equipstatus"
import warning from "@/components/meualist/warning"
import information from "@/components/meualist/information"
import debug from "@/components/meualist/debug"
import management from "@/components/meualist/management"
import history from "@/components/meualist/history"
import faraway from "@/components/meualist/faraway"
import main from "@/components/homepage/main"
import statusinfo from "@/components/departs/statusinfo"
import addwarehouse from "@/components/dialog/addwarehouse"

Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
}
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
            path: '/history',
            component: history
        }, {
            path: '/faraway',
            component: faraway
        }, {
            path: 'statusinfo',
            component: statusinfo
        }]
    },
    {
      path: '/addwarehouse',
      component: addwarehouse  
    }]
})