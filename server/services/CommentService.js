import ApiError from '../exeptions/ApiError.js';
import CommentModel from '../models/CommentModel.js';
import UserModel from '../models/UserModel.js';
import LikeModel from '../models/LikeModel.js'
import DislikeModel from '../models/DislikeModel.js'

class CommentService{

    //создание комментария
    async create(userId, bookId, title, text, rating){
        const user = await UserModel.findById(userId);
        if(!user)
            throw ApiError.BadRequest('Invalid user id');
        
        if(!user.isActivated)
            throw ApiError.Forbidden('User account is not activated')

        await CommentModel.create({userId, bookId, title, text, rating});
    }

    //для нахождения всех комментариев к одной книге
    async getByBookId(bookId){
        let rawComments = await CommentModel.find({bookId}).select('-__v')
       
        let comments = []
        for(let i = 0; i < rawComments.length; i++){
            let likes = await LikeModel.find({commentId: rawComments[i]._id}).select("userId -_id")
            let dislikes = await DislikeModel.find({commentId: rawComments[i]._id}).select("userId -_id")
            comments.push({...rawComments[i]._doc, likes, dislikes})
        }

        return comments;
    }

    //для нахождения всех комментариев пользователя
    async getByUserId(userId){
        const comments = await CommentModel.find({userId}).select('-__v')
        return comments;
    }

    //Для изменения комментария: кол-ва лайков/дизлайков
    async update(id, likes, dislikes){
        const com = await CommentModel.findByIdAndUpdate(id, 
            {likes, dislikes}, {new: true});
    }

    async addLike(commentId, userId){
        let isExist = await LikeModel.findOne({commentId, userId})
        console.log(isExist)
        if(isExist)
            throw ApiError.BadRequest("Like already exist")

        await LikeModel.create({commentId, userId})
    }

    async removeLike(commentId, userId){
        await LikeModel.deleteOne({commentId, userId})
    }

    async addDislike(commentId, userId){
        let isExist = await DislikeModel.findOne({commentId, userId})

        if(isExist)
            throw ApiError.BadRequest("Like already exist")

        await DislikeModel.create({commentId, userId})
    }

    async removeDislike(commentId, userId){
        await DislikeModel.deleteOne({commentId, userId})
    }
}

export default new CommentService();