import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import FakeUsersTokenRepositories from '../repositories/fakes/FakeUsersTokenRepositories'
import ResetPassowrdService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepositories;
let fakeUserTokenRespository: FakeUsersTokenRepositories;
let fakeHashProvider: FakeHashProvider;
let resetPassowrd: ResetPassowrdService;

describe('ResetPassowrd', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories();
    fakeUserTokenRespository = new FakeUsersTokenRepositories();
    fakeHashProvider = new FakeHashProvider();


    resetPassowrd = new ResetPassowrdService(
      fakeUsersRepository,
      fakeUserTokenRespository,
      fakeHashProvider
    );
  })

  it(`Should be able to reset user's passoword`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRespository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassowrd.execute({
      password: '123123',
      token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(updatedUser?.password).toBe('123123');
  });

  it(`Should not be able to reset password with non-existing token`, async () => {
    await expect(resetPassowrd.execute({
      token: 'non-existing-token',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError)
  })
});
