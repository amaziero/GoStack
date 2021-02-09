import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUserRepossitories from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ user_id, email, name, old_password, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found')
    }

    const emailAlreadyTaken = await this.usersRepository.findByEmail(email)

    if (emailAlreadyTaken && emailAlreadyTaken.id !== user_id) {
      throw new AppError('Email already been taken')
    }

    user.name = name;
    user.email = email;

    if (password) {
      if (!old_password) {
        throw new AppError('You must enter the old password')
      } else {

        if (!this.hashProvider.compareHash(old_password, user.password)) {
          throw new AppError('Current password is wrong')
        }

        user.password = await this.hashProvider.generateHash(password)
      }
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
