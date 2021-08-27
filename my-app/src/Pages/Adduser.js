import React,{useState} from 'react';

import {Link,Redirect} from 'react-router-dom'
import Axios from 'axios';
import {Formik,Form,Field} from 'formik';
import {useHistory} from 'react-router-dom';
import Authservice from './auth.services';
import './Adduser.css'
import { toast,ToastContainer } from 'react-toastify';

function Adduser() {

    const stat = Authservice.getCurrentUser();
    let history = useHistory();  
    const [word, setword] = useState('')

    const adduser = (values)=>{
        console.log(values.pass)
        if(values.frname && values.lname&& values.email && values.pass && values.role){
        const user = JSON.parse(localStorage.getItem('data'))
        const token = user.token
        console.log('the user role is',values.role,values.frname);
        Axios.post('http://localhost:4000/adduserhash',{
            firstname:values.frname,lastname:values.lname,email:values.email,password:values.pass,role:values.role
        },{headers:{"authorization":`Bearer ${token}`} }).then((response)=>{
            if(response.data.message==='value inserted'){
                    history.push('/adminpanel')
            }else if (response.data.message==='Email already exist'){
                       setword('Email already exist')
            }
        })
    }else{
        toast("Please fill all the fields")
    }
  }

    const initialValues = {
        fname:"",
        lname:"",
        mail:"",
        pass:"",
        role:""
    }

    return (
   <div className="addusergrid">
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
        {!stat
            ?<Redirect to='/' />:
            <div className="usercontainer">
                <div className='adduserdiv'>
                     <Formik initialValues={initialValues} onSubmit={adduser}>   
                    <Form className='adduser-form'>
                        <div className='adduserform-head'>
                        <h3 className='adduser-head'>Add User</h3>
                            </div>
                          <div className='dhod'>
                              <label htmlFor='frname'  >First Name</label> <br/>
                              <Field type='text' placeholder="First Name" className="dhodfield"  name='frname' id='frname'></Field>
                          </div>
                          <div className='dhod'>
                              <label htmlFor='lname' >Last Name</label> <br/>
                              <Field type='text' placeholder="Last Name" className="dhodfield"  name='lname' id='lname'></Field>
                          </div>
                          <div className='dhod'>
                              <label htmlFor='email' >Email</label> <br/>
                              <Field type='email' placeholder="Email"  className="dhodfield" name='email' id='email'></Field>
                          </div>
                          <div className='dhod'>
                              <label htmlFor='pass' >Password</label> <br/>
                              <Field type='password' placeholder="Password" className="dhodfield"  name='pass' id='pass'></Field>
                          </div>
                          <div className='dhod'>
                              <label htmlFor='role' >Role</label> 
                              <Field component='select' className="dhodselect" name="type" name='role' id="role">
                                <option value=''>select</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                               
                                </Field>
                          </div>
                          <div id='userbutt'>
                              <button type='submit' className='btnadd' > Add User </button>
                          <div className="thisisbutton">   <Link to='/adminpanel'><button id="thisisback"   className='btnaddb'> Back</button></Link> </div> 
                          </div>
                          </Form>
                    </Formik>
                    <div className='adshow'>
  <h2 className='adh2'>{word}</h2>
                    </div>
                </div>
            </div>
        }
        </div>
    )
}

export default Adduser