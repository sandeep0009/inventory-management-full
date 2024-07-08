import mongoose from "mongoose";

const orderSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }   , 
    consumer:{
type:mongoose.Schema.Types.ObjectId,
        ref:'consumers',
        required:true
    }  ,
            items:{
                type:[
                    {
                        name:{
                            type:String,
                            trim:true
                        },
                        price:{
                            type:Number
                        }
                    }
                ]
            } ,

    isActive:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

const orders=mongoose.model('orders',orderSchema);
export default orders;