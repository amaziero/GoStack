import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticaded);

appoitmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentServices();

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

appoitmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});

export default appoitmentsRouter;
