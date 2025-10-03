import mongoose from "mongoose";


const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:true,
        trim:true,
        maxlength:100
    },
    helpful:{
        type:Number,
        default:0
    },
    verifiedPurchase:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

//Prevent duplicate reviews 
reviewSchema.index({user:1,product:1},{unique:true});

export default mongoose.model("Review",reviewSchema)