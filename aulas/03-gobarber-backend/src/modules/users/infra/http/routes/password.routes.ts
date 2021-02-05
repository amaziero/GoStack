import { Router } from 'express';
import ForgotPasswordControllers from '../controllers/ForgotPasswordControllers';
import ResetPassowordController from '../controllers/ResetPassowordController';

const sessionsRouter = Router();
const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPassowordController();

sessionsRouter.post('/forgot', forgotPasswordControllers.create);
sessionsRouter.post('/reset', resetPasswordControllers.create);

export default sessionsRouter;
