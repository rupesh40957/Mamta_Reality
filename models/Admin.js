const  mongoose  = require("mongoose");
const{Schema}= mongoose;


// rules and regulation follwing the Schema
const UserSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref :'admin',
        role: 'admin',
    },
    name:{
        type:String,
        require :true
    },
    email:{
        type:String,
        require :true,
        unique:true
    },
    password:{
        type:String,
        require :true
    },
    resetToken: {
        type: String,
        default: null,
      },
      resetTokenExpiry: {
        type: Date,
        default: null,
      },
    date:{
        type:Date,
        default:Date.now
       
    }
  });
  mongoose.models={}
module.exports=mongoose.model('Admin',UserSchema);