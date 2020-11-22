import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepositories from '@modules/users/infra/typeorm/repositories/UsersRepositories';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const userRepository = new UsersRepositories();

  const authenticateUser = new AuthenticateUserService(userRepository);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.status(200).json({ user, token });
});

export default sessionsRouter;
