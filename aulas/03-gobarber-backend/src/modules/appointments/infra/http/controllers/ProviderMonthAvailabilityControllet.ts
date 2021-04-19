import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';

export default class ProvidersMonthAvaliabilityController {
  public async index(request: Request, response: Response) {
    const provider_id = request.params.id;
    const { month, year } = request.query;

    const listMounthAvaliabilityService = container.resolve(ListProviderMonthAvaliabilityService);

    const avaliability = await listMounthAvaliabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(avaliability);

  }
}
