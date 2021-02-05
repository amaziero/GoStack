import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUserRepossitories from '../repositories/IUsersRepositories';
import IUserTokenRepossitories from '../repositories/IUserTokenRepositories';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface RequestUser {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('UserTokenrepository')
    private userTokenRepository: IUserTokenRepossitories,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ password, token }: RequestUser): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User dosent exist')
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User dosent exist')
    }

    const tokenCreateAt = userToken.created_at
    const compareDate = addHours(tokenCreateAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError(`Token expired, try again`)
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
