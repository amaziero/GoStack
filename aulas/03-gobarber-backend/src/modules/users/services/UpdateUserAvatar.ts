import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUserRepossitories from '../repositories/IUsersRepositories';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  constructor(
    private usersRepository: IUserRepossitories
  ) {}

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You must login!', 401);
    }

    if (user.avatar) {
      // Delete current avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
