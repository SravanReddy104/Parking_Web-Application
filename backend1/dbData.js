
import mongoose from "mongoose";

const data = mongoose.Schema({
    username:String,
    vechileNo:String,
    checkIn:String,
    checkOut:String
});
export default mongoose.model('parkingdata',data);