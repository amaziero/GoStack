import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepossitories from '../repositories/IUsersRepositories';
import IUserTokenRepository from '../repositories/IUserTokenRepositories';


interface IRequestUser {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) { }

  public async execute({ email }: IRequestUser): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Couldn't find the email provided`)
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider
      .sendMail(
        email,
        `Pedido de recuperação de email recebido ${token}`
      )
  }
}

export default SendForgotPasswordEmailService;
