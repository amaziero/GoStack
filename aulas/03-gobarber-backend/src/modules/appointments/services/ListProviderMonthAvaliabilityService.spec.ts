import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRespository'

let listProviderMonthAvaliabibility: ListProviderMonthAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvaliabibility = new ListProviderMonthAvaliabilityService(fakeAppointmentsRepository)
  })

  it(`Should be able to list the month avaliability from provider`, async () => {

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 9, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 10, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 11, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 12, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 13, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 16, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 20, 17, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2021, 4, 21, 8, 0, 0)
    })

    const avaliability = await listProviderMonthAvaliabibility.execute({
      provider_id: 'user',
      year: 2021,
      month: 5
    })

    expect(avaliability).toEqual(expect.arrayContaining([
      { day: 19, avaliable: true },
      { day: 20, avaliable: false },
      { day: 21, avaliable: true },
      { day: 22, avaliable: true }
    ]))
  })
})
