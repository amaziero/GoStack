import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserservice';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();

    const createUser = new CreateUserService(fakeUsersRepository);
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
});
