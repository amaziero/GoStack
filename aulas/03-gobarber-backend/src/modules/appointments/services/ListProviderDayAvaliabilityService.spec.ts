import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRespository'

let listProviderDayAvaliabibility: ListProviderDayAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvaliabibility = new ListProviderDayAvaliabilityService(fakeAppointmentsRepository)
  })

  it(`Should be able to list avaliable hours in a day for a provider`, async () => {

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0)
    })

    const avaliability = await listProviderDayAvaliabibility.execute({
      provider_id: 'user',
      day: 20,
      year: 2020,
      month: 5
    })

    expect(avaliability).toEqual(expect.arrayContaining([
      { hour: 8, avaliable: false },
      { hour: 9, avaliable: false },
      { hour: 10, avaliable: false },
      { hour: 11, avaliable: false },
      { hour: 12, avaliable: true },
      { hour: 13, avaliable: true },
      { hour: 14, avaliable: true }
    ]))
  })
})
