import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepossitories from '../repositories/IUsersRepositories';
import IUserTokenRepossitories from '../repositories/IUserTokenRepositories';

interface RequestUser {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokenrepository')
    private userTokenRepository: IUserTokenRepossitories,
  ) { }

  public async execute({ email }: RequestUser): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`Couldn't find the email provided`)
    }

    await this.userTokenRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de email recebido')
  }
}

export default SendForgotPasswordEmailService;
