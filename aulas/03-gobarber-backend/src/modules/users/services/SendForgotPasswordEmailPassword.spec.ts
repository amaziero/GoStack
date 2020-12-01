import FaKeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepositories'
import SendForgotPasswordEmail from './SendForgotPasswordEmailPassword';

describe('SendForgotPasswordEmail', () => {
  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeMailProvider = new FaKeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider
    );

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

  it('Should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepositories();
    const fakeMailProvider = new FaKeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'jowhdoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
