import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmtentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllDayFromProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmtentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}
