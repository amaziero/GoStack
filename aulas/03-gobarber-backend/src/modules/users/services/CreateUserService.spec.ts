import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import CreateUserServices from './CreateUserservice';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'


describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user, missing email', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      createUser.execute({
        name: 'John Doe',
        email: '',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user, missing password', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepositories();
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jowhdoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user, email alreary used', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepositories();
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jowhdoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
