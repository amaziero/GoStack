// In this abastraction structure the AppointmentsRepository is responsable for
// interact with the object itself on the data base, all thigs like:
// create, list, delete and change an Appointment, will have most of it's logic
// here.
import Appointment from '../infra/typeorm/entities/Appointments';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
