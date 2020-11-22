import { Router } from 'express';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import CreateUserService from '@modules/users/services/CreateUserservice';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar';
import UsersRepositories from '@modules/users/infra/typeorm/repositories/UsersRepositories';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const userRepository = new UsersRepositories();
  const { name, email, password } = request.body;
  const createUser = new CreateUserService(userRepository);
  const user = await createUser.execute({ name, email, password });

  return response.status(200).json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  async (request, response) => {
    const userRepository = new UsersRepositories();
    const updateUserAvatar = new UpdateUserAvatarService(userRepository);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json(user);
  }
);

export default usersRouter;
