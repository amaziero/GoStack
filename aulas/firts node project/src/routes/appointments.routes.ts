import { Router } from 'express';
import { uuid } from 'uuidv4';

interface Appoitments {
  id: string;
  provider: string;
  date: string;
}

const appoitmentsRouter = Router();
const appointments: Appoitments[] = [];

appoitmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);

  return response.json(appointment);
});

appoitmentsRouter.get('/', (request, response) => {
  return response.status(200).json(appointments);
});

export default appoitmentsRouter;
