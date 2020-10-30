// This class is responsable for represent the Appointment content within it
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointments;
