// This class is responsable for represent the Appointment content within it

import { uuid } from 'uuidv4';

class Appointments {
  id: string;

  provider: string;

  date: Date;

  constructor(provider: string, date: Date) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointments;
