import mongoose from "mongoose";

const DislikeSchema = new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, required:true, ref: 'User'},
    commentId: {type: mongoose.Types.ObjectId, required:true, ref: 'Comment'}
})

export default mongoose.model('Dislike', DislikeSchema);