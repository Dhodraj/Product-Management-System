import React,{useState} from 'react'
import Authservice from './auth.services'
import {Redirect,useHistory,useLocation,Link} from 'react-router-dom'
import Axios from 'axios';
import "./Editprodpanel.css"


function Editprodpanel() {

  const stat = Authservice.getCurrentUser();
     const [quan, setquan] = useState('')
     const [word, setword] = useState('')
     const history = useHistory();
     const location = useLocation();

     localStorage.setItem('productid',location.state.productid)
     const productid = localStorage.getItem('productid')

 const update = () =>{
            const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
            Axios.put('http://localhost:4000/updatequan',{newquan:quan,productid:productid},{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
                     if(response.data.message==='updated'){
                             history.push('/userpanel')
                     }else{
                            setword("sorry can't process")
                     }
            })
 }

    return (
        <div className="updategrid">
            { !stat?<Redirect to='/' />:

        <div className='updatecontain'>
           <div className='dhod'>
               <label>Update Quantity</label>
               <br/>
                 <input placeholder='Quantity' onChange={(e)=> setquan(e.target.value)} />
           </div>
           <br/>
           <div className='updatebuttons'>
           <div >
           <button type='submit' className='btnadd' onClick={update}>Update</button>
           </div>
           <br/>
           <div>
               <Link to="/userpanel"><button className="btnaddb">Back</button></Link>
               </div>
           </div>
        </div>
}
        </div>
    )
}

export default Editprodpanel