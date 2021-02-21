import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepositories;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCaheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories();
    fakeHashProvider = new FakeHashProvider();
    fakeCaheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCaheProvider
    );
  })

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    await expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user, missing email', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: '',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user, missing password', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jowhdoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new user, email alreary used', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jowhdoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
