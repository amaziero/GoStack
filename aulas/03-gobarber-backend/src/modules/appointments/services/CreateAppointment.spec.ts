import CreateAppoimentServices from './CreateAppointmentService';
import FakeAppointmentRespository from '../repositories/fakes/FakeAppointmentRespository'

describe('CreateAppointment', () => {
  it('Should be able to create a new appimtment', async () => {
    const fakeRepository = new FakeAppointmentRespository();
    const createAppointment = new CreateAppoimentServices(fakeRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '6546549879871314679'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('6546549879871314679');
  });

  // it('Should not able to create tow appimtments at the same time', () => {

  // });
});
