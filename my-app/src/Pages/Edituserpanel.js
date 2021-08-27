import React,{useState,useEffect} from 'react'
import { useLocation,useHistory,Link } from "react-router-dom";
import {Formik,Form,Field} from 'formik';
import './Edituserpanel.css'
import Axios from 'axios';
import {Redirect} from  'react-router-dom';
import Authservice from './auth.services';
import { toast } from 'react-toastify';

function Edituserpanel() {
    const location =useLocation();
    const history =useHistory();
    console.log('edit user page id is ',  location.state.id);
    localStorage.setItem('stateid',location.state.id);

    const id = localStorage.getItem('stateid')
    const stat = Authservice.getCurrentUser();
   
     const [detail, setdetail] = useState([])
     const [word, setword] = useState('')
    const [newfirstname, Setfirst] = useState()
    const [newlastname, Setlast] = useState()
    const [newemail, Setemail] = useState()

    const [array, setarray] = useState([])


    
    // const data=async(id)=> {
    //     try{
    //         const data = await Axios.get(`http://localhost:4000/getsingle/${id}`);
    //         setarray(data.data);
    //         console.log('kumar',data.data)
    //     } catch(e){
    //         console.log(e)
    //     }
    // }
    // useEffect(()=>{
    //     data(id);
    // },[])



const sendfnameupdate = (id) =>{
   
        const user = JSON.parse(localStorage.getItem('data'))
        const token = user.token
         Axios.put('http://localhost:4000/updatefname',{name:newfirstname,id:id,lname:newlastname,email:newemail},{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
                if(response.data.message==='updated'){
                      history.push('/adminpanel')
                }
         })
        
       
}



console.log('detail is',detail[0])
    return (
        <div className='editpanelgrid'>
        { !stat?<Redirect to='/'/>
        :
        <div className="editborder">
              <div className='adduserdiv'>

                  
                          <div>
                              <h2 className="headertext">Edit User Details</h2>
                              <div className='editnamediv'>
                                 <label  for='first name'>First name</label><br/>
                                 <input placeholder="New Firstname" className='editfinput' onChange={(e)=>{Setfirst(e.target.value)}}/><br/><br/>
                                 </div>
                                 <div className='editnamediv'>
                                 <label    for='last name'>Last name</label><br/>
                                 <input className='editfinput' placeholder="New Lastname" onChange={(e)=>{Setlast(e.target.value)}}/><br/><br/>
                                 </div>
                                 <div className='editnamediv'>
                                 <label  for='email'>Email</label><br/>
                                 <input className='editfinput' placeholder="New Email" onChange={(e)=>{Setemail(e.target.value)}}/><br/><br/>
                                 </div>
                          </div>
                                 <div className="editbuttons">
                                 <div classname='updatebtn'>
                                 <button type='submit' className='btnadd' onClick={()=>{sendfnameupdate(id)}}>Update</button>
                                 </div>
                                 <div className="backButton">
                               <Link to="/adminpanel">  <button type='submit' className='btnaddb' >Back</button> </Link>
                                     </div>
                                 </div>
                   
                   
                </div>
        </div>}
        </div>
    )
}

export default Edituserpanel