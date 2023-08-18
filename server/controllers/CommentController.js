import CommentService from "../services/CommentService.js";

class CommentController{
    async getByBookId(req, res, next){
        try {
            const bookId = req.params.id;
            const comments = await CommentService.getByBookId(bookId);
            return res.status(200).json(comments);
        } catch (error) {
            next(error)
        }
    }

    async getByUserId(req, res, next){
        try {
            const userId = req.params.id;
            const comments = await CommentService.getByUserId(userId);
            return res.status(200).json(comments);
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next){
        try {
            const bookId = req.params.id;
            const {title, text, rating} = req.body;
            const id = req.user.id;
            await CommentService.create(id, bookId, title, text, rating);
            res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }

    async addLike(req, res, next){
        try {
            const commentId = req.params.id;
            const userId = req.user.id
            await CommentService.addLike(commentId, userId);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }

    async removeLike(req, res, next){
        try {
            const commentId = req.params.id;
            const userId = req.user.id
            await CommentService.removeLike(commentId, userId);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }

    async addDislike(req, res, next){
        try {
            const commentId = req.params.id;
            const userId = req.user.id
            await CommentService.addDislike(commentId, userId);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }

    async removeDislike(req, res, next){
        try {
            const commentId = req.params.id;
            const userId = req.user.id
            await CommentService.removeDislike(commentId, userId);
            return res.status(201).end();
        } catch (error) {
            next(error)
        }   
    }
}

export default new CommentController();