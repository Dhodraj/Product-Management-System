import React from 'react'
import {useState,useEffect} from 'react';
import Axios from 'axios';
import Authservice from './auth.services'
import {Link,Redirect,useHistory} from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditAttributesIcon from '@material-ui/icons/EditAttributes';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import "./Adminpanel.css"
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';

function Adminpanel() {

    
    const stat = Authservice.getCurrentUser();
    
    const history = useHistory();
    const [updateuserid,setupdateuserid]=useState('')
      const [userlist, setuserlist] = useState([])
    
    
        

//     const status = () =>{
        
//         console.log('enter useeffect',logstat)
//         let store = JSON.parse(localStorage.getItem('data'))
//         if(store && store.login){
//             console.log('store is before',store.login)
//            setLogstat(store.login)
//            setStore(store)
//         console.log('exit useeffect is',logstat)
//         console.log('store is after',store.login)
//        }
//  }

//  useEffect(()=>{
          
//           status();
//  },[]);

// const showbooks = () =>{
//     const user = JSON.parse(localStorage.getItem('data'))
//     const token = user.token
//     console.log('the localstorage token is ',token);
//     Axios.get('http://localhost:4000/books',{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
//         if(response.data.message){
//             console.log(response.data.message)
//         }else{
//            console.log(response.data)
//         }
//     })
// }
    const logout = () =>{
        Authservice.logout();
        window.location.reload()
    }

    const deleteUser=(id)=>{
        const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
        Axios.delete(`http://localhost:4000/delete/${id}`,{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
          console.log(id);
          setuserlist(
            userlist.filter((val)=>{
              return val.id!==id;
            })
          );
        });
      };

      const getUsers = async() =>{
        try{
            const user = JSON.parse(localStorage.getItem('data'))
            const token = user.token
            const data = await Axios.get('http://localhost:4000/userdatadetails',{headers:{"authorization":`Bearer ${token}`} });
            setuserlist(data.data);

        } catch(e){
            console.log(e)
        }
  };

  useEffect(()=>{
    getUsers();
},[])

    return (
        
            
        <div >
           
          {!stat? 
          <Redirect to='/'/> :
              <div>
              <div className='adminpanel'>
            <div className='but'>
            <div className='prbutton'>
                <Link to='/addinventory'>
                    <IconButton >
                        <button className="abutton">
                    <ShoppingCartOutlinedIcon />
                    <span>Add Inventory</span>
                    </button>
                    
                    </IconButton>
                </Link>
            </div>
                <div className='prbutton'>
                <Link to='/adduser'>
                    <IconButton >
                        <button className="abutton">
                    <PersonAddIcon />
                    <span>Add User</span>
                    </button>
                    
                    </IconButton>
                </Link>
            </div>
            <div className='prbutton'>
            <Link to='/'>
                    <IconButton >
                        <button className="abutton">
                    <ExitToAppOutlinedIcon onClick={logout} />
                    <span>Log Out</span>
                    </button>
                    
                    </IconButton>
                </Link>
                </div>
            </div>
             <div className='datatable'>
                 <table className='tableprint'>
                       <thead>
                           <tr className='trow'>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                       </thead>
                       <tbody>
                      {userlist.map((val,key)=>{
                          return(
                            <tr>
                                    <td>{val.firstname}</td>
                                    <td>{val.lastname}</td>
                                    <td>{val.email}</td>
                                    
                                    <td><Link to={{
                                        pathname:'/edituser',
                                        state:{
                                          id:val.id
                                        }
                                    }}  ><button className="button_slide_right"><IconButton><BorderColorOutlinedIcon /></IconButton></button></Link></td>
                                    <td> <button className="button_slide_right" onClick={()=>{if(window.confirm('Delete the item?')){deleteUser(val.id);}}}><IconButton><DeleteSweepOutlinedIcon /></IconButton></button> </td>
                            </tr>
                          )
                      })}
                          
                       </tbody>
                 </table>
             </div>
        </div>
              
            </div>
          }    
            
            

        </div>
    )
}

export default Adminpanel