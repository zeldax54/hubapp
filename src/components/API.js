import axios from 'axios';

  export default class API {
   
    async registerUser(jsonNewUser,url){     
        let data = {
            username:jsonNewUser.email.split("@")[0],
            email:jsonNewUser.email,
            password:jsonNewUser.password
        }
         return await
         axios.post(url, data)
        .then(res => {      
          console.log(res.data.result);
          return JSON.parse(res.data.result);
        }).catch(error => {       
            console.error('There was an error!', error);
            return error;
        });           
    }

}


