import "reflect-metadata"
import { startOfHour, isBefore, format } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import AppError from '@shared/errors/AppError';
import ICreateAppointmtentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepositoty';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationRepository')
    private notificationsRepository: INotificationsRepository
  ) { }

  public async execute({ provider_id, user_id, date }: ICreateAppointmtentDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const appointmetHour = appointmentDate.getHours()

    if (appointmetHour < 8 || appointmetHour > 18) {
      throw new AppError(`Appointemntes can be created only at 8 am to 6 pm`)
    }

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

    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormated}`
    })

    return appointment;
  }
}

export default CreateAppointmentService;
