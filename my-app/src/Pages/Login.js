import React,{useState,useEffect} from 'react';
import  {useHistory} from 'react-router-dom';
import Axios from 'axios';
import Authservice from './auth.services';
import './Login.css'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Login() {

  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
   const [word, setword] = useState('')
  
   const history = useHistory();
    
    const login = () =>{
        console.log(email,password)
        if(email && password)
        {
            Authservice.login(email,password).then((response)=>{
                if(response.login===true && response.role==='admin'){
                   history.push('/adminpanel')
                }else if(response.login===true && response.role==='user'){
                              history.push('/userpanel')
                }
                else{
                  setword(response.message)
                  toast("You are not an Authorised User");
                }
            })
        }
        else{
            toast("Fill All the Fields")
        }
             
    }

    console.log(password)




    return (
      <div class="containers">
          <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <div class="card">   
      <h2 className="cardtext">Login</h2>  
              <div className="inputBoxcard" >
                  <input className="inputBox" type="email" className='inpfield' onChange ={(e)=> setemail(e.target.value)} name='email' required placeholder="Email" />
              </div>
              <div  className="inputBoxcard" >
                  <input className="inputBox"  type="password" className='inpfield' onChange={(e)=> setPassword(e.target.value)} name='pass' required placeholder="Password" />
              </div>
              <div className="btnBox">
              
                  <button type='submit' onClick={login} className="btnlogaa">
                  Log In
              </button>
              </div>
      </div>
  </div>
    );
}

export default Login