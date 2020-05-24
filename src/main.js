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

router.beforeEach((to, from, next) => {
    console.log("Enter before", from.path, to.path)
    if(from.path == '/index'){
        var userName = localStorage.getItem("UserName");
        post("/admin/getUserAbilities", userName, reponse => {
            var urls = reponse.data;
            if(urls.includes(to.path)){
                next();
            }
        })
    }else {
        next();
    }
    
})