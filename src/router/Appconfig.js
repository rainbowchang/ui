var AppConfig = {
    host:"http://127.0.0.1:8000",
    restUrl: function(paraUrl){
        return this.host + paraUrl;
    }
}

export default AppConfig;
