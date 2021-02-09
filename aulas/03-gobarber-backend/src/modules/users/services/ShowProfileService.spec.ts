import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepositories'
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService


describe('UpdateProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(fakeUserRepository)
  })

  it(`Should be able to show user info`, async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('jowhdoe@gmail.com')
  })

  it(`Should not be able to show user info from a non exiting user`, async () => {
    await expect(showProfileService.execute({
      user_id: 'non-existing-user'
    })).rejects.toBeInstanceOf(AppError)
  })
})
