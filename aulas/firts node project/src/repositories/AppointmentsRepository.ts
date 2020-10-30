// In this abastraction structure the AppointmentsRepository is responsable for
// interact with the object itself on the data base, all thigs like:
// create, list, delete and change an Appointment, will have most of it's logic
// here.

import Appointment from '../models/Appointments';
import { isEqual } from 'date-fns';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
