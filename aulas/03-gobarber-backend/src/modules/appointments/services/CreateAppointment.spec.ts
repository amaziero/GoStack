import CreateAppoimentServices from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeAppointmentRespository from '../repositories/fakes/FakeAppointmentRespository'
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeAppointmentsRepository'

let fakeRepository: FakeAppointmentRespository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCaheProvider: FakeCacheProvider;
let createAppointment: CreateAppoimentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentRespository();
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeCaheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppoimentServices(
      fakeRepository,
      fakeNotificationsRepository,
      fakeCaheProvider
    );
  })

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      user_id: 'user_id',
      date: new Date(2020, 4, 10, 13),
      provider_id: 'provider_id'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('Should not able to create two appointments at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 14)

    await createAppointment.execute({
      user_id: 'user_id',
      date: appointmentDate,
      provider_id: 'provider_id'
    });

    await expect(
      createAppointment.execute({
        user_id: 'user_id',
        date: appointmentDate,
        provider_id: 'provider_id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in a passed time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 10),
      provider_id: 'user',
      user_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an appointment with itself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'user',
      user_id: 'user'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an appointment before 8 am and 6 am', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 7),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 19),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(AppError)
  })
});
