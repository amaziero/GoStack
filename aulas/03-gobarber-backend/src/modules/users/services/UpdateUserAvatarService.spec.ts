import AppError from '@shared/errors/AppError';
import FakeDiskStorageProvider from '@shared/container/providers/StoreProviders/Fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories'
import UpdateUserAvatarService from './UpdateUserAvatar';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeDiskStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;


describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeDiskStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    )
  })
  it(`Should be able to upload user's avatar`, async () => {
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
    expect(
      updateUserAvatar.execute({
        user_id: 'non existen user',
        avatarFileName: 'teste-update-user-avatar.png'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it(`Should delete old avatar when new avatar before new avatar is saved`, async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

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
