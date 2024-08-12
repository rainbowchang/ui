// let backEndUrl = "http://127.0.0.1:8000"
let host = `${window.location.host}`
let ss = host.split(":");
let backEndUrl;
if(ss.length === 1){
    backEndUrl = `${window.location.protocol}//`.concat(ss[0])
} else if(ss.length === 2){
    backEndUrl = `${window.location.protocol}//`.concat(ss[0]).concat(':8000')
}

if(process.env.VUE_APP_BACK_END_URL !== undefined){
    backEndUrl = process.env.VUE_APP_BACK_END_URL;
}

var AppConfig = {
    host: backEndUrl,
    restUrl: function(paraUrl){
        return this.host + '/api' + paraUrl;
    }
}

export default AppConfig;
