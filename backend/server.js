const express = require("express");
const app= express();
const mysql = require("mysql");
const cors = require('cors')
const bcrypt= require('bcrypt')

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "crud",
    port: 3305,
}); 
db.connect();

const verifyJWT = (req,res,next)=>{
    const token= req.headers["x-access-token"]

    if(!token){
        res.send("YOU NEED A TOKEN");
    }else{
        jwt.verify(token,".env",(err,decoded)=>{
            if(err){
                res.json({auth:false,message:"U FAILED"});
            }else{
                req.userId=decoded.id;
                next()
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req,res)=>{
    res.send("YOU ARE AUTH");
})

app.get('/signin', (req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.over});
    }else{
        res.send({loggedIn:false});
    }
})


app.post("/signin",(req,res)=>{
    const mail = req.body.mail;
    const password= req.body.password;

    db.query('SELECT * FROM jwt WHERE Email=?',[mail],
    (err,result)=>{

    if(err){

        res.send({err:err});
    }
 
        if(result.length>0){
            bcrypt.compare(password,result[0].password,(err,res)=>{
                if(res){
                    req.session.user=result;

                    const id=result[0].id
                    const token = jwt.sign({id}, process.env ,{
                        expiresIn:300,
                    })
                    req.session.user=result;
                    res.json({auth:true,token:token,result:result});
                    res.send(result);
                }else{
                    res.send({message:"WORNG USERNAME/PASSWORD"});
                }
            });
        }else{
            res.send({message:"USER DOESN't EXIST"});
        }
    }

    );
});





// app.post("/create" ,(req,res) =>{
//     const fname = req.body.fname;
//     const lname = req.body.lname;
//     const mail = req.body.mail;

//    db.query('INSERT INTO jwt (Firstname,Lastname,Email) VALUES (?,?,?)', 
//     [fname,lname,mail],
//     (err,result)=>{
//         if(err){
//             console.log(err);
//         }else{
//             res.send({message: "values inserted"});
//             console.log("sup")
//             res.end();
//         }
//     }
//     );
// });







app.listen(3005,() => {
    console.log("Working in 3005");
})