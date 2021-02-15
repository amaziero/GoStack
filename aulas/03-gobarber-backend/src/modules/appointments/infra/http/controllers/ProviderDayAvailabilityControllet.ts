import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderDayAvaliabilityService from '@modules/appointments/services/ListProviderDayAvaliabilityService';

export default class ProvidersDayAvaliabilityController {
  public async index(request: Request, response: Response) {
    const provider_id = request.params.id
    const { day, month, year } = request.body


    const listDayAvalilabilityService = container.resolve(ListProviderDayAvaliabilityService);

    const dayAvaliability = await listDayAvalilabilityService.execute({
      provider_id,
      day,
      month,
      year,
    })

    return response.json(dayAvaliability);

  }
}
