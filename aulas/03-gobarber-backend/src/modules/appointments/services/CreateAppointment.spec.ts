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

  it('Should be able to create a new appimtment', async () => {
    const appointment = await createAppointment.execute({
      user_id: '6546549879871314679',
      date: new Date(),
      provider_id: '6546549879871314679'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('6546549879871314679');
  });

  it('Should not able to create tow appimtments at the same time', async () => {
    const appointmentDate = new Date(2020, 10, 10, 11)

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
});
