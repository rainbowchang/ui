import appConfig from '../router/Appconfig';
import axios from 'axios'

// 使用axios，自定义get/post方法


axios.defaults.withCredentials=true;
export const post = (url, param, consumer) => {
    return axios.post(appConfig.restUrl(url), param,
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'userName' : encodeURIComponent(localStorage.getItem("UserName")),
            'url' : url
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const get = (url, consumer) => {
    return axios.get(appConfig.restUrl(url),
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'userName' : encodeURIComponent(localStorage.getItem("UserName")),
            'url' : url
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const areas =["华东区域", "东北区域", "西北区域", "华北区域", "西南区域", "华南区域", "华中区域"]

export const provinces=["北京", "天津", "上海", "重庆", "河北", "河南",
                        "云南", "辽宁","黑龙江", "湖南", "安徽", "山东",
                        "新疆", "江苏", "浙江", "江西", "湖北", "广西", 
                        "甘肃", "山西", "内蒙古", "陕西","吉林", "福建",
                        "贵州", "广东", "青海", "西藏", "四川", "宁夏",
                        "海南",  "台湾", "香港", "澳门"]

export const getProvinceByArea = (area) => {
    switch (area) {
        case "华东区域":
            return ["山东", "江苏", "安徽", "浙江", "福建", "上海", "台湾"];
        case "东北区域":
            return ["辽宁", "吉林", "黑龙江"];
        case "西北区域":
            return ["陕西", "甘肃", "宁夏", "青海", "新疆"];
        case "华北区域":
            return ["北京", "河北", "山西", "天津", "内蒙古"];
        case "西南区域":
            return ["云南", "贵州", "四川", "重庆", "西藏"];
        case "华南区域":
            return ["广东", "广西", "海南", "香港", "澳门"];
        case "华中区域":
            return ["湖南", "湖北", "河南", "江西"];
        default:
            return [];
    }
}

export const getAreaByProvince = (province) => {
    switch (province) {
        case "山东":
        case "江苏":
        case "安徽":
        case "浙江":
        case "福建":
        case "上海":
        case "台湾":
            return "华东区域";
        case "辽宁":
        case "吉林":
        case "黑龙江":
            return "东北区域";    
        case "陕西":
        case "甘肃":
        case "宁夏":
        case "青海":
        case "新疆":
            return "西北区域";
        case "北京":
        case "河北":
        case "山西":
        case "天津":
        case "内蒙古":
            return "华北区域";
        case "云南":
        case "贵州":
        case "四川":
        case "重庆":
        case "西藏":
            return "西南区域";
        case "广东":
        case "广西":
        case "海南":
        case "香港":
        case "澳门":
            return "华南区域";
        case "湖南":
        case "湖北":
        case "河南":
        case "江西":
            return "华中区域"   
        default:
            return "";
    }
}