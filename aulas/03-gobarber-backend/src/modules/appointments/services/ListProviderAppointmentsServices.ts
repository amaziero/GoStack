import "reflect-metadata"
import { inject, injectable } from 'tsyringe';
import Appointments from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointments[]> {
    const appointment = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    })

    return appointment
  }
}

export default ListProviderAppointmentsService;
