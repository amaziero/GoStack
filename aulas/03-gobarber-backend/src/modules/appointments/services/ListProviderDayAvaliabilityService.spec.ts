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
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
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
      { hour: 14, avaliable: false },
      { hour: 15, avaliable: false },
      { hour: 16, avaliable: true },
      { hour: 17, avaliable: true }
    ]))
  })
})
