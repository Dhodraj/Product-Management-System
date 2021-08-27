import React,{useState,useEffect} from 'react';
import {Redirect, useHistory,useLocation} from 'react-router-dom';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import './Userpanel.js';
import Axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Link} from 'react-router-dom';
import Authservice from './auth.services';
import './Producteditpanel.css'

function Producteditpanel() {

    const location=useLocation()
    localStorage.setItem('stateid',location.state.id)
    const stat = Authservice.getCurrentUser();

    const id = localStorage.getItem('stateid')

    const [prodlist,setprodlist] = useState([])

     
    const deleteUserproduct=(productid)=>{
        const user = JSON.parse(localStorage.getItem('data'))
        const token = user.token
        
        Axios.delete(`http://localhost:4000/deleteproduct/${productid}`,{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
          console.log(productid);
          setprodlist(
            prodlist.filter((val)=>{
              return val.productid!==productid;
            })
          );
        });
      };

      

    const getprods = async()=>{
        try{
            const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
              const data = await Axios.get(`http://localhost:4000/getprod/${id}`,{headers:{"authorization":`Bearer ${token}`} })
              console.log('back-front',data.data)
              setprodlist(data.data)
        } catch(e){
             console.log('error at prod get axios',e);
        }
    };
    useEffect(()=>{
        getprods();
    },[])

    return (
       <div>
         { !stat? <Redirect to='/' />
           : <div className='userpanel'>
                 <div className='userpanel-icons'>
                    <div classNmae='urbutton'>
                          <Link to='/adminpanel'> <IconButton>
                                    <ArrowBackIosIcon /> 
                           </IconButton> </Link></div>
                 </div>
                 <div className='datatable'>
                 <table className='tableprint'>
                       <thead>
                           <tr className='trow'>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                       </thead>
                    {prodlist.map((val,key)=>{
                        return(
                            <tr className='trow'>
                                   <td>{val.productname}</td>
                                   <td>{val.quantity}</td>
                                   <td>{val.type}</td>
                                   <td><Link to='/product-edit'> <IconButton>
                                    <EditAttributesIcon /> 
                           </IconButton> </Link></td>
                           <td>
                           <button className="deleteButton" className="button_slide_right" onClick={()=>{if(window.confirm('Delete the item?')){deleteUserproduct(val.productid);}}} >  <DeleteForeverIcon/> </button>
                           </td>
                            </tr>
                        )
                    })}
                       
                 </table>
             </div>
        </div>
        }
        </div>
    )
}

export default Producteditpanel