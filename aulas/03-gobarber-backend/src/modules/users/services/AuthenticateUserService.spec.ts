import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserservice';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

describe('AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user ', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: 'jowhdoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorret email/passord match', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    expect(
      authenticateUser.execute({
        email: 'jowhdoe@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
