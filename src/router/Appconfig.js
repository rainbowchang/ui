var backEndUrl = "http://47.114.139.202:8081"
if(process.env.VUE_APP_BACK_END_URL != undefined){
    backEndUrl = process.env.VUE_APP_BACK_END_URL;
}

var AppConfig = {
    host: backEndUrl,
    restUrl: function(paraUrl){
        return this.host + paraUrl;
    }
}

export default AppConfig;
