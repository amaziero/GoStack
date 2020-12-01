import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import FakeUsersTokenRepositories from '../repositories/fakes/FakeUsersTokenRepositories'
import ResetPassowrdService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepositories;
let fakeUserTokenRespository: FakeUsersTokenRepositories;
let resetPassowrd: ResetPassowrdService;

describe('ResetPassowrd', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories();
    fakeUserTokenRespository = new FakeUsersTokenRepositories();


    resetPassowrd = new ResetPassowrdService(
      fakeUsersRepository,
      fakeUserTokenRespository
    );
  })

  it(`Should be able to reset user's passoword`, async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const userToken = await fakeUserTokenRespository.generate(user.id);

    await resetPassowrd.execute({
      password: '123123',
      token: userToken.token,
    })

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123123');
  });
});
