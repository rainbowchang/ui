import axios from 'axios';
// import Vue from 'vue'
import qs from 'qs';
//创建一个axios实例
//创建一个测试实例（数据来源于数据采集系统）
const instance2 = axios.create({
    baseURL: 'http://www.baidu.com',
    timeout: 6000,
});



export const ceshi = (params) => { return instance2.post('', qs.stringify(params)).then(res => res.data) }