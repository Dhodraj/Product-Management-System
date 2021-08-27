import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Link,useHistory} from 'react-router-dom';
import Adminpanel from './Pages/Adminpanel';
import Login from './Pages/Login'
import Userpanel from './Pages/Userpanel';
import Adduser from './Pages/Adduser'
import Edituserpanel from './Pages/Edituserpanel'
import Producteditpanel from './Pages/Producteditpanel'
import Addingproducttoinvent from './Pages/Addingproducttoinvent';
import Adduserproduct from './Pages/Adduserproduct';
import Editprodpanel from './Pages/Editprodpanel';
import "./App.css"

function App(){


 return(
  <div>
        <Router>
        <Switch>
        <Route exact path='/' component = {()=> <Login />} />
        <Route exact path='/adminpanel' component={()=><Adminpanel />} />
        <Route exact path='/userpanel' component={()=> <Userpanel />} />    
        <Route exact path='/adduser' component={()=> <Adduser />} />    
        <Route exact path='/edituser' component={()=> <Edituserpanel />} />    
        <Route exact path='/userproductinfo' component={()=> <Producteditpanel />} /> 
        <Route exact path='/addinventory' component={()=> <Addingproducttoinvent />} />   
        <Route exact path='/adduserproduct' component={()=> <Adduserproduct />} />
        <Route exact path='/userprodedit' component={()=> <Editprodpanel />} />
        </Switch>
        </Router>   
    
        </div> 
    )
    }

export default App;