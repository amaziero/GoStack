import ListProviderAppointmentsServices from './ListProviderAppointmentsServices';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRespository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

let listProviderAppointmentsServices: ListProviderAppointmentsServices;
let fakeCaheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;


describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeCaheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointmentsServices = new
      ListProviderAppointmentsServices(
        fakeAppointmentsRepository,
        fakeCaheProvider
      )
  })

  it(`Should be able to list the appointments in a day for a provider`, async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 12, 0, 0)
    })

    const appointmentTwo = await fakeAppointmentsRepository.create({
      user_id: 'user_id',
      provider_id: 'provider',
      date: new Date(2020, 4, 20, 13, 0, 0)
    })

    const appointments = await listProviderAppointmentsServices.execute({
      provider_id: 'provider',
      day: 20,
      month: 5,
      year: 2020
    })

    expect(appointments).toEqual([appointmentOne, appointmentTwo])
  })
})
