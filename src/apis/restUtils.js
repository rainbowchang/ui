import appConfig from '../router/Appconfig';
import axios from 'axios'

// 使用axios，自定义get/post方法

export const post = (url, param, consumer) => {
    return axios.post(appConfig.restUrl(url), param,
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}

export const get = (url, consumer) => {
    return axios.post(appConfig.restUrl(url),
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => {
        console.log(response);
        consumer(response);
    });
}
// export default{
//     data(){
//         return {
//             resp: []
//     }},

//     methods: {
//         post(url, param){
//         axios.post(appConfig.restUrl(url), param,
//         {
//             headers: {
//             'Content-Type': 'application/json;charset=UTF-8'
//         }})
//         .then(response => {
//                 console.log(response);
//                 this.resp = response;
//             }).catch(function (response) {
//                 alert(response);
//             });
//         },

//         get(url){
//             axios.get(appConfig.restUrl(url))
//             .then(response => {
//                     console.log(response);
//                     this.resp = response;
//                 }).catch(function (response) {
//                     alert(response)
//             });
//         }
//     }
// }