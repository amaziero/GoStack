import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import AuthenticateUserService from './AuthenticateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUsersRepository: FakeUsersRepositories;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let fakeCaheProvider: FakeCacheProvider;


describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories();
    fakeCaheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();



    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  })

  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
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
    expect(
      authenticateUser.execute({
        email: 'jowhdoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorret email/passord match', async () => {
    await fakeUsersRepository.create({
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
