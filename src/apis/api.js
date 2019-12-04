import axios from 'axios';
// import Vue from 'vue'
import qs from 'qs';
//创建一个axios实例
//创建一个测试实例（数据来源于数据采集系统）
const instance2 = axios.create({
    baseURL: 'http://www.baidu.com', //前半段公共的地址链接
    timeout: 6000,
});


// params参数，url地址后半段，方法post/get，以下实例为post
export const ceshi = (params) => { return instance2.post('url', qs.stringify(params)).then(res => res.data) }