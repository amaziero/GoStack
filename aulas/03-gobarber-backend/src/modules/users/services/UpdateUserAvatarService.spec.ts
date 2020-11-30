import AppError from '@shared/errors/AppError';
import FakeDiskStorageProvider from '@shared/container/providers/StoreProviders/Fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories'
import UpdateUserAvatarService from './UpdateUserAvatar';


describe('UpdateUserAvatar', () => {
  it(`Should be able to upload user's avatar`, async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'teste-update-user-avatar.png'
    })

    expect(user.avatar).toBe('teste-update-user-avatar.png');
  });

  it(`Should not be able to upload user's avatar - non existent user`, async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDiskStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatar.execute({
        user_id: 'non existen user',
        avatarFileName: 'teste-update-user-avatar.png'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`Should delete old avatar when new avatar before new avatar is saved`, async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDiskStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'teste-update-user-avatar.png'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'teste-update-user-avatar-new.png'
    })

    expect(deleteFile).toHaveBeenCalledWith('teste-update-user-avatar.png');
    expect(user.avatar).toBe('teste-update-user-avatar-new.png');
  });
});
