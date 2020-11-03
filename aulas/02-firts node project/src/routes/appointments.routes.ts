import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';

const appoitmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoitmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentServices(
      appointmentsRepository
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appoitmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.status(200).json(appointments);
});

export default appoitmentsRouter;
