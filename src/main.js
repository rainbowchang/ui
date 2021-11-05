import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {post} from "@/apis/restUtils"
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
// import './less/normalize.css'
// import './less/base.less'
// import Modal from './Modal';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import china from 'echarts/map/json/china.json'
import './assets/ccs/mycss.css'

Vue.use(ElementUI)
echarts.registerMap('china', china)
Vue.prototype.$echarts = echarts

Vue.use(VueRouter);
Vue.use(iView, {
    transfer: true,
    size: 'large',
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
});
Vue.config.productionTip = false
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')

function globalShareRoutePathes(){
    return ["/information"];
}

function checkGlobalUrl(pageRoutePath){
    var pathes = globalShareRoutePathes();
    for(var i in pathes){
        if(pathes[i] === pageRoutePath){
            return true;
        }
    }
    return false;
}

router.beforeEach((to, from, next) => {
    if(checkGlobalUrl(to.path)){
        next();
        return;
    }
    console.log("Enter before", from.path, to.path)
    var userName = localStorage.getItem("UserName");
    if(to.path === "/login" || to.path === "/register" || to.path === "/index" || to.path === "/qrhome" || to.path === "/download_sms" || to.path === "/qrdownload" || to.path === "/download_home") {
        next()
        return
    }
    post("/admin/getAllWebAbilityNames", userName, reponse => {
        var urls = reponse.data;
        if(urls == null){
            next();
            return;
        }
        console.log("urls", urls);
        for(var i in urls){
            var url = urls[i];
            if(to.path == url) {
                console.log("beforeEach", to.path, url)
                next();
            }
        }
    })
    
})