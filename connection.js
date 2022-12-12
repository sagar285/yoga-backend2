const mongoose=require("mongoose");


mongoose.connect('mongodb+srv://sagar:sagar@cluster0.n6eofyt.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("connection succesful");
}).catch((err)=>{
    console.log(err);
})

const registerschema = new mongoose.Schema ({
    name:{
        type:String ,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
       
        
    },
    timing:{
        type:String,
        required:true
    }
});

const register = mongoose.model("Register",registerschema);

module.exports=register;