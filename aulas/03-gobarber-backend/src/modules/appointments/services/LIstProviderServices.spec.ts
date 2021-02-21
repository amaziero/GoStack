import AppError from '@shared/errors/AppError'; import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepositories'
import ListProviderService from './LIstProviderServices';


let fakeUserRepository: FakeUsersRepository;
let fakeCaheProvider: FakeCacheProvider;
let listProfileService: ListProviderService;


describe('ListProviders', () => {
  beforeEach(() => {
    fakeCaheProvider = new FakeCacheProvider();
    fakeUserRepository = new FakeUsersRepository()

    listProfileService = new ListProviderService(
      fakeUserRepository,
      fakeCaheProvider
    )
  })

  it(`Should be able to list the providers`, async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'jowhdoe@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'John Trê',
      email: 'jowhdoetre@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'jowhdoequa@gmail.com',
      password: '123456',
    });

    const providers = await listProfileService.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([
      user1,
      user2
    ])
  })
})
