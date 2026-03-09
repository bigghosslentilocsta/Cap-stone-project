// User model supporting multiple roles: admin, user, author
import {Schema, model} from 'mongoose'

const userSchema=new Schema({

    firstName:{
        type:String,
        required:[true,"first name is required"]
    },
    lastName:{  
        type:String
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    profileImage:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","user","author"],  // Three role types for platform
        required:[true,"{Value} is an invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true  // Used for blocking/unblocking users and authors
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }  
},
{
        timestamps:true,
        strict:"throw",
        versionKey:false
    })

export const UserTypeModel = model("User", userSchema)
