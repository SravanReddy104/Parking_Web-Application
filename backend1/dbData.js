
import mongoose from "mongoose";

const data = mongoose.Schema({
    username:String,
    vechileNo:Number,
    checkIn:String,
    checkOut:Boolean
});
export default mongoose.model('parkingdata',data);