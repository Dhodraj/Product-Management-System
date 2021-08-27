import React,{useState} from 'react'
import Authservice from './auth.services';
import {Redirect,Link,useHistory} from 'react-router-dom';
import Axios from 'axios';
import "./Addingproducttoinvent.css"


function Addinventory() {
     
    const [product, setproduct] = useState('')
   const history = useHistory();
     const stat =  Authservice.getCurrentUser();
     const [word, setword] = useState('');

     const send = ()=>{
         if(product){
        const user = JSON.parse(localStorage.getItem('data'))
        const token = user.token
        
        Axios.post('http://localhost:4000/addinventory',{
            productname:product},{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
            if(response.data.message==='value inserted'){
                    history.push('/adminpanel')
            }else if (response.data.message==='product already exist'){
                       setword('product already exist')
            }
        })
    }else{
        setword("Insert a Product")
    }
  }
     

    return (
        <div className="itisgrid">
            <div className="gridborder">
            {
                !stat ? <Redirect to='/'/>:
                <div className="inventgrid" >
                    <h2 className="headertext">Add Product to Inventory</h2>
                    <input className='inventinp' placeholder=' Add Product' onChange={(e)=> setproduct(e.target.value)} name='prod' />
                 <div className="inventbutt">   <button type='submit' className='btnadd' onClick={send}>Add</button>
                 <Link to='/adminpanel'><button type='submit' id="this" className='btnaddb'>Back</button></Link>
                 </div>
                    <div>
                      <h3>  {word}</h3>
                      </div>
                    </div>
            }
            </div>
        </div>
    )
}

export default Addinventory