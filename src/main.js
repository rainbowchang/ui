import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import echarts from 'echarts'
// import './less/normalize.css'
// import './less/base.less'
// import Modal from './Modal';
import china from 'echarts/map/json/china.json'

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