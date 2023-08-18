import { Router } from "express";
import CommentController from "../controllers/CommentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const commentRouter = new Router();

commentRouter.post('/:id/likes', authMiddleware(['User', 'Admin']), CommentController.addLike);
commentRouter.delete('/:id/likes', authMiddleware(['User', 'Admin']), CommentController.removeLike);

commentRouter.post('/:id/dislikes', authMiddleware(['User', 'Admin']), CommentController.addDislike);
commentRouter.delete('/:id/dislikes', authMiddleware(['User', 'Admin']), CommentController.removeDislike);

export default commentRouter;