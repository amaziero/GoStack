import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdtadeProviderService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfieleService: UpdateProfileService


describe('UpdateProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfieleService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    )
  })

  it(`Should be able to update its profile`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfieleService.execute({
      user_id: user.id,
      name: 'John Tres',
      email: 'jowhdoe2@example.com'
    })

    expect(updatedUser.name).toBe('John Tres')
    expect(updatedUser.email).toBe('jowhdoe2@example.com')

  })

  it(`Should not be able to change the email to an email already taken`, async () => {
    await fakeUserRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await expect(updateProfieleService.execute({
      user_id: user.id,
      name: 'John Tres',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it(`Should be able to update the password`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfieleService.execute({
      user_id: user.id,
      name: 'John Tres',
      email: 'jowhdoe2@example.com',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it(`Should not be able to update the password without old password`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await expect(updateProfieleService.execute({
      user_id: user.id,
      name: 'John Tres',
      email: 'jowhdoe2@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })

  it(`Should not be able to update the password with current password informed wrong`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    await expect(updateProfieleService.execute({
      user_id: user.id,
      name: 'John Tres',
      email: 'jowhdoe2@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })
})
