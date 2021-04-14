import { Router } from 'express';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import ProfileController from '../controllers/ProfileController';
import { celebrate, Segments, Joi } from 'celebrate'

const profileRouter = Router();
const profileControllet = new ProfileController();

profileRouter.use(ensureAuthenticaded)

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileControllet.update)
profileRouter.get('/', profileControllet.show)

export default profileRouter;
