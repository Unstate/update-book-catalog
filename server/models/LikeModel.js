import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, required:true, ref: 'User'},
    commentId: {type: mongoose.Types.ObjectId, required:true, ref: 'Comment'}
})

export default mongoose.model('Like', LikeSchema);