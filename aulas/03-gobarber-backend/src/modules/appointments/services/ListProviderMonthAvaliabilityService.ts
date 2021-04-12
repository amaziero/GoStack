import "reflect-metadata"
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepositories';
import { getDaysInMonth, getDate, isAfter } from 'date-fns'

interface IRequest {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array<{
  day: number
  avaliable: boolean
}>

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year
      }
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    )

    const avaliability = eachDayArray.map(day => {
      const compareDate = new Date(year, month - 1, day, 23, 59, 59)

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      })

      return {
        day,
        avaliable:
          isAfter(compareDate,new Date()) &&
          appointmentsInDay.length < 10,
      }
    })

    return avaliability
  }
}

export default ListProviderMonthAvaliabilityService;
