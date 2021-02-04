import FaKeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import FakeUsersTokenRepositories from '../repositories/fakes/FakeUsersTokenRepositories'
import SendForgotPasswordEmail from './SendForgotPasswordEmailPasswordService';

let fakeUsersRepository: FakeUsersRepositories;
let fakeMailProvider: FaKeMailProvider;
let fakeUserTokenRespository: FakeUsersTokenRepositories;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepositories();
    fakeMailProvider = new FaKeMailProvider();
    fakeUserTokenRespository = new FakeUsersTokenRepositories();


    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRespository
    );
  })

  it('Should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'jowhdoe@gmail.com',
    })

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover a non existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jowhdoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const genarateToken = jest.spyOn(fakeUserTokenRespository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'jowhdoe@gmail.com',
    })

    expect(genarateToken).toHaveBeenCalledWith(user.id);
  });
});
