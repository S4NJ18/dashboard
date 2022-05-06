const express = require('express');
var path = require('path')

const db = require("./db")
const users = require("./model/user")

const app = express();
const port = 3000;

app.use(session({secret: 'sanjib',saveUninitialized: true,resave: true}));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }))

app.use(express.json());
app.set('view engine', 'ejs');

var sess;


app.get("/register", (req, res) => {

    res.sendFile('./views/register.html', { root: __dirname });



});

app.post("/register", async (req,res)=>{

    
    console.log(req.body)
    try{
        const user = new users({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.pass

            
             
        })
        await user.save()
        res.status(201).json({
             status:true,
             message:`user created with ID: ${user._id}`
        })
    }
    catch(error){
         res.status(500).json({
              status:false,
              message: error.message
         })
    }

  

})





    app.get("/login", (req, res) => {

            res.sendFile('./views/login.html' , { root: __dirname });

    });

    const auth = async (req,res,next)=>{
    
        try{
            const user = await users.findOne({ 
                email:req.body.email,
                 password:req.body.pass
           })
      
            if(user !== null){
                // req.body.musu = user.username
                 next()
            }
            
            else {
                 res.send("USER NOT FOUND")
            }
        } catch(e){
             res.status(404).json({
                  status:false,
                  message: e.message
             })
        }
         
    }


     // DASHBOARD MIDDLEWARE HERE
     const dahsboard =(req,res)=>{
        // res.send("THIS THE DASHBOARD PAGE FOR MUSUNURU "+req.body.musu);
                // res.send("THIS THE DASHBOARD PAGE FOR MUSUNURU ");
                res.sendFile('./views/dashboard.html', { root: __dirname });


    }
    
    
    
    
    // ROUTE FOR LOGIN CHECK
    app.post("/login", auth, dahsboard)
    
    app.get("/", (req, res) => {
        res.status(200).send(
            "<h1>Home Page found on the server</h1>")
    })

    app.use((req, res) => {
        res.status(404).send(
            "<h1>Page not found on the server</h1>")
    })


   

    
    
    
    app.listen(port, () => console.log(`listening on port ${port}!`));



