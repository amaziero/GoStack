import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderAppointmentsServices from '@modules/appointments/services/ListProviderAppointmentsServices';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response) {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listAppointemntsService = container.resolve(ListProviderAppointmentsServices);

    const appointments = await listAppointemntsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);

  }
}
