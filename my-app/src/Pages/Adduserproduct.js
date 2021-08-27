import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'
import Authservice from './auth.services'
import {useHistory,Link} from 'react-router-dom';
import "./Adduserproduct.css"

function Adduserproduct() {
     
    const stat = Authservice.getCurrentUser();
    const [prodlist, setprodlist] = useState([])
    const [select, setselect] = useState('')
    const [type, settype] = useState('')
    const [quans, setquans] = useState('')

    const history = useHistory() 

    const getprods = async()=>{
        try{
            const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
              const data = await Axios.get(`http://localhost:4000/inventoryprod`,{headers:{"authorization":`Bearer ${token}`} })
              console.log('back-front',data.data)
              setprodlist(data.data)
        } catch(e){
             console.log('error at prod get axios',e);
        }
    };
    useEffect(()=>{
        getprods();
    },[])


   const senddata = () =>{
    const user = JSON.parse(localStorage.getItem('data'))
    const token = user.token
    console.log('ajax',select,type,quans)
         Axios.post('http://localhost:4000/sendprod',{
                product:select,quantity:quans,type:type
         },{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
                if(response.data.message==='values inserted'){
                       history.push('/userpanel');
                }
                
         })
   }


    return (
        <div className="prodgrid">
            {!stat?<Redirect to='/'></Redirect>
               :<div className='prodcontain'>
                   <div className="foralign">
                   <h2 className="headertext">Add Your Product</h2>
                   <div className='dhod'>
                   <label htmlFor="type">Item</label>
                   <select className="dhodselect" onChange={(e)=>setselect(e.target.value)}>
                       <option value=''>Select Product</option>
                      {    
                      
                      prodlist.map((val,key)=>{
                               return(
                              <option value={val.productname}>{val.productname}</option> 
                               )   
                      })
                      }
                      </select>
                      </div>
                      <div className='dhod'>
                          <label>Quantity</label><br/>
                          <input placeholder='For eg.2' type='number' onChange={(e)=> setquans(e.target.value)}></input>
                     </div>
                      <div className='dhod'>
                              <label htmlFor="type">Type</label>
                                <select className="dhodselect" name="type" onChange={(e)=>{settype(e.target.value)}} id="type">
                                <option value=''>Select type</option>
                                <option value="liters">liters</option>
                                <option value="pounds">pounds</option>
                                <option value='packets'>packets</option>
                                <option value='kilograms'>kilograms</option>
                                </select>
                                </div>
                                <div className='dhod'>
                                     <button type='submit' id="forwidth" onClick={senddata} className='btnadd'> Add</button>
                                </div>
                                <div className='dhod'>
                                    <Link to="/userpanel">
                                     <button type='submit'  onClick={senddata} className='btnaddb'> Back</button>
                                     </Link>
                                </div>
                </div>
                </div>
            }
        </div>
    )
}

export default Adduserproduct