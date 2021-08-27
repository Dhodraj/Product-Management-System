import axios from 'axios';
import Axios from 'axios';

class Authservice{
    login(username,password) {
         console.log('authservice login')
          return Axios.post('http://localhost:4000/login',{
               mail:username,pass:password
          }).then((response)=>{
              console.log('auth page data is',response.data)
              if(response.data.token){
                   localStorage.setItem('data',JSON.stringify(response.data))
                   return response.data;
              }else{
                  return response.data;
              }
              
          });
    }

    logout(){
        
          localStorage.clear()
          
    }

    register(username,email,password) {
        return Axios.post('http://localhost:4000/signup',{
            fname:username,
            email:email,
            password:password
        })
    }

    getCurrentUser(){
           if(localStorage.getItem('data') && JSON.parse(localStorage.getItem('data'))['login']){
                      return true;
           }else{
               return false;
           }
    }
}

export default new Authservice();