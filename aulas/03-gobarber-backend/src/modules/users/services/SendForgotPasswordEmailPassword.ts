// import User from '@modules/users/infra/typeorm/entities/Users';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import IUserRepossitories from '../repositories/IUsersRepositories';

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
  ) { }

  public async execute({ email }: RequestUser): Promise<void> {
    this.mailProvider.sendMail(email, 'Pedido de recuperação de email recebido')
  }
}

export default SendForgotPasswordEmailService
  ;
