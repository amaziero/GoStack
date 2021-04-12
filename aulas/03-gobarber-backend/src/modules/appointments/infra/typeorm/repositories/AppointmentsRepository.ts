// In this abastraction structure the AppointmentsRepository is responsable for
// interact with the object itself on the data base, all thigs like:
// create, list, delete and change an Appointment, will have most of it's logic
// here.
import Appointment from '../entities/Appointments';
import { getRepository, Repository, Raw } from 'typeorm';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositories';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date, provider_id: string):
    Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });
    return findAppointment;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      user_id,
      provider_id,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment
  }

  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0')

    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldname =>
          `to_char(${dateFieldname}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      },
    })

    return appointment
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0')
    const parseMonth = String(month).padStart(2, '0')

    const appointment = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldname =>
          `to_char(${dateFieldname}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        )
      },

      relations: ['user'],
    })

    return appointment
  }
}

export default AppointmentsRepository;
