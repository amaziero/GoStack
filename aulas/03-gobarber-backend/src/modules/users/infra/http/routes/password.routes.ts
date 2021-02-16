import { Router } from 'express';
import ForgotPasswordControllers from '../controllers/ForgotPasswordControllers';
import ResetPassowordController from '../controllers/ResetPassowordController';
import { celebrate, Segments, Joi } from 'celebrate'

const sessionsRouter = Router();
const forgotPasswordControllers = new ForgotPasswordControllers();
const resetPasswordControllers = new ResetPassowordController();

sessionsRouter.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), forgotPasswordControllers.create);

sessionsRouter.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().required().valid(Joi.ref('password'))
  }
}), resetPasswordControllers.create);

export default sessionsRouter;
