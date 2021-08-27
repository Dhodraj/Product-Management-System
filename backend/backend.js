const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const app = express()

app.use(cors());

app.use(express.json())


const db = mysql.createConnection({
        user:"root",
        host:"localhost",
        password:"",
        database:"crud",
        port:3305
});




const authenticatejwt =(req,res,next) =>{
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if(authHeader){
              const token = authHeader.split(' ')[1];

                       
              jwt.verify(token,'dhodraj123',(err,user)=>{
                      if(err){
                               return res.send({message:"403 error"});
                      }
                      
                      req.user = user;
                      next();
              });
    }else{
              return res.send({message:"401 error"});
    }
}

app.post('/sendprod',authenticatejwt,(req,res)=>{
    const userid =req.user.id
    const productname = req.body.product
    const quantity = req.body.quantity
    const type = req.body.type
    console.log(userid,productname,quantity,type)

   db.query('select productid from inventory where productname=? ',[productname],(err,result)=>{
           if(result.length>0){
                   const prodid = result[0]['productid']
                   console.log(result[0]['productid'])
                   db.query('insert into product (productid,id,quantity,type) values(?,?,?,?)',[prodid,userid,quantity,type],(err,result)=>{
                       if(err){
                             res.send({error:err})
                             console.log(err)
                       }else{
                           res.send({message:"values inserted"})
                       }
                   })
           }
   })
    
})



app.put('/updatequan',authenticatejwt,(req,res)=>{
     const quan = req.body.newquan
     const userid = req.user.id
     const productid = req.body.productid
     
     db.query('update product set quantity=? where productid=? and id=?',[quan,productid,userid],(err,result)=>{
           if(err){
                res.send({error:err})
           }else{
                 res.send({message:"updated"})
           }
     })
     
})



    app.delete("/delete/:id",authenticatejwt,(req,res)=>{
        const id = req.params.id;
        db.query("DELETE FROM product WHERE id=?",id,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                db.query("delete from task where id=?",id,(err,result)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("success")
                    }
                })
                
                res.send(result);
            }
        })})

app.get('/userdatadetails',authenticatejwt,(req,res)=>{

        db.query('SELECT * FROM task',(err,result)=>{
            if(result.length>0){
                console.log(result);
                res.send(result);
                res.end();
            }
        })
    })

app.post('/loginh',(req,res)=>{
    const email = req.body.mail;
        const password = req.body.pass;
    
        db.query('select * from task where email=? and password=?',[email,password],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                const user = {email:email,password:password,id:result[0]['id'],role:result[0]['role']}
                const token = jwt.sign(user,'dhodraj123')
                res.send({token:token,login:true,role:result[0]['role']})

            }
        })
})

app.post('/login',(req,res)=>{
        const email = req.body.mail;
        const password = req.body.pass;

        console.log(email,password)
        
        
        db.query('select * from task where email=?',[email],(err,result)=>{
                    if(err){
                              console.log(err)
                    }else{
                            
                         if(result.length>0){
                            console.log(result[0]['password'])
                              if(bcrypt.compareSync(password,result[0]['password'])){
                                console.log('the id is',result[0]['id'])
                                const user = {email:email,password:password,id:result[0]['id'],role:result[0]['role']}
                                const token = jwt.sign(user,'dhodraj123')
                                res.send({token:token,login:true,role:result[0]['role']})
                            }else{
                                res.send({message:"Wrong password"})
                            }
                         }   
                         else{
                                res.send({message:'Unauthorized user',login:false})
                         }     
                    }
        })
        
        
        
})

app.put('/updatefname',authenticatejwt,(req,res)=>{

    const id=req.body.id
    const name=req.body.name
    const lname=req.body.lname
    const email = req.body.email

    
    if(name && lname && email){
           db.query('update task set firstname=?,lastname=?,email=? where id=?',[name,lname,email,id],(err,result)=>{
               if(err){
                   console.log('update fname error',err)

               }else{
                     res.send({message:'updated'})
                     res.end()
               }
           })
    }
    else if(name && lname){
      db.query('update task set firstname=?,lastname=? where id=?',[name,lname,id],(err,result)=>{
          if(err){
              console.log('update fname error',err)

          }else{
                res.send({message:'updated'})
                res.end()
          }
      })
}
else if(name && email){
  db.query('update task set firstname=?,email=? where id=?',[name,email,id],(err,result)=>{
      if(err){
          console.log('update fname error',err)

      }else{
            res.send({message:'updated'})
            res.end()
      }
  })
}
else if(lname && email){
  db.query('update task set lastname=?,email=? where id=?',[lname,email,id],(err,result)=>{
      if(err){
          console.log('update fname error',err)

      }else{
            res.send({message:'updated'})
            res.end()
      }
  })
}
else if(name){
  db.query('update task set firstname=? where id=?',[name,id],(err,result)=>{
      if(err){
          console.log('update fname error',err)

      }else{
            res.send({message:'updated'})
            res.end()
      }
  })
}
else if(lname){
  db.query('update task set lastname=? where id=?',[lname,id],(err,result)=>{
      if(err){
          console.log('update fname error',err)

      }else{
            res.send({message:'updated'})
            res.end()
      }
  })
}
else if(email){
  db.query('update task set email=? where id=?',[email,id],(err,result)=>{
      if(err){
          console.log('update fname error',err)

      }else{
            res.send({message:'updated'})
            res.end()
      }
  })
}
})



app.get('/getprod/:id',authenticatejwt,(req,res)=>{
    const id = req.params.id;
    db.query("select productid,productname,quantity,type from product where id=?",id,(err,result)=>{
          if(err){
              console.log('getprod/id route error',err);
          }
          else{
              res.send(result);
              res.end();
          }
    })
})

app.delete("/deleteproduct/:productid",authenticatejwt,(req,res)=>{
    const productid = req.params.productid;
    db.query("DELETE FROM product WHERE productid=?",productid,(err,result)=>{
        if(err){
            console.log(error);
        }else{
            console.log("Comin here")
            res.send(result);
        }
    }
    )
})

app.delete("/deleteproduct/:productid",authenticatejwt,(req,res)=>{
    const productid = req.params.productid;
    db.query("DELETE FROM product WHERE productid=?",productid,(err,result)=>{
        if(err){
            console.log(error);
        }else{
            console.log("Comin here")
            res.send(result);
        }
    }
    )
})

app.get('/getprod',authenticatejwt,(req,res)=>{
       console.log(req.user)
       db.query("select * from product p join inventory i on p.productid=i.productid where id=?",[req.user.id],(err,result)=>{
             res.send(result)
       })
})

app.get('/inventoryprod',authenticatejwt,(req,res)=>{
    console.log(req.user)
    db.query("select productname from inventory ",(err,result)=>{
          res.send(result)
    })
})

 
app.post('/adduserhash',authenticatejwt,(req,res)=>{
    
    const firstname=req.body.firstname
    const lastname=req.body.lastname
    const email = req.body.email
    const password = req.body.password
    const role = req.body.role
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = {firstname:firstname,lastname:lastname,email:email,password:passwordHash}

 if(firstname && lastname && email && password && role){
   db.query('SELECT * from task where email=?',[email],(err,result)=>{
           if(result.length>0){
                  res.send({message:"Email already exist"});
                  res.end();
           }else{
            db.query('INSERT INTO task (email,password,firstname,lastname,role) VALUES (?,?,?,?,?)',[email,passwordHash,firstname,lastname,role],(err,result)=>{
                if(err){
                       res.send({message:'Error'});
                       res.end();
                }else{
                    res.send({message:'value inserted',value:user})
                    res.end()
                }
            })
           }

   })    }
   else{
       res.send({message:"fill all the fields"})
       res.end()
   }
})


app.post('/addinventory',authenticatejwt,(req,res)=>{
       const product = req.body.productname

       db.query("select * from inventory where productname=?",[product],(err,result)=>{
               if(result.length>0){
                       res.send({message:"product already exist"})
               }else{
                   db.query("insert into inventory (productname) values (?)",product,(err,result)=>{
                    if(err){
                           res.send('error is',err)
                    }else{
                    res.send({message:"value inserted"})}
                   })
               }
       })
})






app.listen(4000)