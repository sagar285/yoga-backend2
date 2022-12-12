const cors = require("cors");
const express =require("express");
const Register = require("./connection");
const stripe = require("stripe")("sk_test_51LQDmPSJatPmI7e760DSJDIRx3H5SnUrDEO9euEnsno859m1HDbslZ4oUFjvZxMTGxpzmy3Y8kzqaim7fIBX1Hxa00bt3rupwI")
const uuid = require("uuid").v4;
const app=express();
require('dotenv').config()



app.use(cors())
app.use(express.json())

app.post("/register",async(req,res)=>{
    try {
        const {name,email,phone,timing}= req.body;
        console.log(req.body);
        if(!name || !email || !phone || !timing){
            return res.status(404).json({error:"plz filled every field"});
        }
        const check =  await Register.findOne({email:email})
      
             if(check){
               
                return res.status(422).json({error:"this id already registerd"})
             }
             else{
                const newuser = new Register(req.body);
                console.log(req.body);
                const registerdata = await newuser.save();
                return res.status(201).json({message:` you succesfully registerd `});

             }
    } catch (error) {
        console.log(error);
    }
})

app.post("/login",async(req,res)=>{
    if(req.body.password && req.body.email){
        const  user = await Register.findOne(req.body)
        if(user){
            res.send({result:"user login succesfully"});
        }
        else{
            res.send({result:"user not found"})
        }
    }
    else{
        res.send({result:"no user found"})
    }
})

app.post("/payment",(req,res)=>{
    const {product,token} =req.body;
    console.log("product",product);
    console.log("price",product.price);
    console.log(req.body);
const idempontencykey =uuid();

return stripe.customers.create({
    email:token.email,
    source:token.id
}).then(function(customer) {
    stripe.charges.create({
        amount:product.price*100,
        currency:"inr",
        customer:customer.id,
        receipt_email:token.email,
        description:`purchase ${product.name} subscription`

    },{idempontencykey})
})
.then(result => res.status(200).json(result)).catch(err => console.log(err))

})
app.get("/",(req,res)=>{
res.send("this is sagar");
})

app.listen(process.env.PORT|| 8080,()=>{
    console.log("server listen on 8080");
})