import {Router} from 'express';
import authRouter from './authRouter.js'
import bookRouter from './bookRouter.js'
import userRouter from './userRouter.js'
import commentRouter from './commentRouter.js';

const router = new Router();

router.use('/books', bookRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/comments', commentRouter)

export default router;