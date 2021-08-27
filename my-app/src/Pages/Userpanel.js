import React from 'react'
import {Redirect} from 'react-router-dom';
import Authservice from './auth.services';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import {useState,useEffect} from 'react';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Link} from 'react-router-dom';
import "./Userpanel.css"
import DeleteSweepTwoToneIcon from '@material-ui/icons/DeleteSweepTwoTone';
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';

function Userpanel() {

    const [prodlist,setprodlist] = useState([])

    const stat = Authservice.getCurrentUser();

    const logout = () =>{
        Authservice.logout();
        window.location.reload()
    }
    
    const getprods = async()=>{
        try{
            const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
              const data = await Axios.get(`http://localhost:4000/getprod`,{headers:{"authorization":`Bearer ${token}`} })
              console.log('back-front',data.data)
              setprodlist(data.data)
        } catch(e){
             console.log('error at prod get axios',e);
        }
    };
    useEffect(()=>{
        getprods();
    },[])



    const deleteUserproduct=(productid)=>{
        console.log(productid)
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

    return (
        <div>
            {
            !stat? <Redirect to='/' />
            :<div className='adminpanel'>
            <div className='but'>
                <div className='prbutton'>
                     <Link to='/adduserproduct'> <IconButton>
                         <button className="abutton">
                               < ShoppingBasketTwoToneIcon />
                               <span>Add Product</span>
                               </button>
                      </IconButton></Link>
                      </div>
                      <div classNmae='prbutton'>
                     <Link to='/'> <IconButton>
                         <button className="abutton">
                               <ExitToAppOutlinedIcon onClick={logout} />
                               <span>Log Out</span> 
                               </button>
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
                              <td><Link to={{
                                   pathname:'/userprodedit',
                                   state:{
                                     productid:val.productid
                                   }
                               }}  > <IconButton>
                               <CreateTwoToneIcon /> 
                      </IconButton> </Link></td>
                      <td>
                      <button className="deleteborder" onClick={()=>{if(window.confirm('Delete the item?')){deleteUserproduct(val.productid);}}} >  <DeleteSweepTwoToneIcon/> </button>
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

export default Userpanel