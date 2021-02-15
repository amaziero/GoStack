import CreateAppoimentServices from './CreateAppointmentService';
import FakeAppointmentRespository from '../repositories/fakes/FakeAppointmentRespository'
import AppError from '@shared/errors/AppError';

let fakeRepository: FakeAppointmentRespository;
let createAppointment: CreateAppoimentServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeRepository = new FakeAppointmentRespository();
    createAppointment = new CreateAppoimentServices(fakeRepository);
  })

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      user_id: '6546549879871314679',
      date: new Date(2020, 4, 10, 13),
      provider_id: '6546549879871314679'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('6546549879871314679');
  });

  it('Should not able to create two appimtments at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 12)

    await createAppointment.execute({
      user_id: '6546549879871314679',
      date: appointmentDate,
      provider_id: '6546549879871314679'
    });

    expect(
      createAppointment.execute({
        user_id: '6546549879871314679',
        date: appointmentDate,
        provider_id: '6546549879871314679'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in a passed time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 10),
      provider_id: 'user',
      user_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError)
  })
});
