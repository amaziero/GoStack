import { Router } from 'express';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileControllet = new ProfileController();

profileRouter.use(ensureAuthenticaded)

profileRouter.put('/', profileControllet.update)
profileRouter.get('/', profileControllet.show)

export default profileRouter;
