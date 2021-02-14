import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response) {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentServices);

    const appointment = await createAppointment.execute({
      user_id,
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);

  }
}
