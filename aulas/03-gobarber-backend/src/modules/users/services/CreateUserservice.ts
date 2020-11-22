import User from '@modules/users/infra/typeorm/entities/Users';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepossitories from '../repositories/IUsersRepositories';

interface RequestUser {
  name: string;
  email: string;
  password?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepositories')
    private usersRepository: IUserRepossitories
  ) {}

  public async execute({ name, email, password }: RequestUser): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email already used');
    }

    if (!password) {
      throw new AppError('You must pass the password', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
