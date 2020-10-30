import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appoitmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointInSameDate) {
    return response.status(400).json({
      message: 'This hours is booked, please choose another hour',
    });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return response.json(appointment);
});

appoitmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll();

  return response.status(200).json(appointments);
});

export default appoitmentsRouter;
