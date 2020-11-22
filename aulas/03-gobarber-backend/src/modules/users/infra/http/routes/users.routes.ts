import { Router } from 'express';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersControllers from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersControllers();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRouter;
