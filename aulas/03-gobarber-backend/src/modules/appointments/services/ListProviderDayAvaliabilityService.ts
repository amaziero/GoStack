import "reflect-metadata"
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';
import { getHours } from 'date-fns'

interface IRequest {
  provider_id: string
  day: number,
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  avaliable: boolean
}>

@injectable()
class ListProviderDayAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year
      }
    )

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )

    const avaliability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      })

      return {
        hour,
        avaliable: !hasAppointmentsInHour,
      }
    })

    return avaliability
  }
}

export default ListProviderDayAvaliabilityService;
