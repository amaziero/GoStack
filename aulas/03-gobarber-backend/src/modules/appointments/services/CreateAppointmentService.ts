import "reflect-metadata"
import { startOfHour, isBefore } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import AppError from '@shared/errors/AppError';
import ICreateAppointmtentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute({ provider_id, user_id, date }: ICreateAppointmtentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(`You can't create and appointment in a passed date`)
    }

    if (provider_id === user_id) {
      throw new AppError(`You can't create an appointment with yourself`)
    }

    const findAppointInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointInSameDate) {
      throw new AppError('This hours is booked, please choose another hour');
    }

    const appointment = await this.appointmentsRepository.create({
      user_id,
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
