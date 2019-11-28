import appConfig from '../router/Appconfig';
import axios from 'axios'
export default{
    post: function(url, param, consumer){
        axios.post(appConfig.restUrl(url), param,
        {headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }})
              .then(response => {
                  console.log(response.data)
                  console.log(response.data.status)
                   if(response.data.status == 'success'){
                       console.log(response.data.status == 'success')
                       consumer();
                   }
             }).catch(function (response) {
                console.log(response)
             });
            },
    get: function(url, consumer){
        axios.get(appConfig.restUrl(url))
           .then(response => {
                   if(consumer != null){
                       consumer(response.data);
                   }
             }).catch(function (response) {
                 alert(response)
             });
    }
}