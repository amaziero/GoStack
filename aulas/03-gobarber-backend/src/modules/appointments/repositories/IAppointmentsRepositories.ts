import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmtentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmtentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
