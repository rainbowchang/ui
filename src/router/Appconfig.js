// var backEndUrl = "http://127.0.0.1:8000"
var backEndUrl = `${window.location.protocol}//${window.location.host}`

if(process.env.VUE_APP_BACK_END_URL != undefined){
    backEndUrl = process.env.VUE_APP_BACK_END_URL;
}

var AppConfig = {
    host: backEndUrl,
    restUrl: function(paraUrl){
        return this.host + '/api' + paraUrl;
    }
}

export default AppConfig;
