import User from '@modules/users/infra/typeorm/entities/Users';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUserRepossitories from '../repositories/IUsersRepositories';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StoreProviders/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepossitories,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You must login!', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
