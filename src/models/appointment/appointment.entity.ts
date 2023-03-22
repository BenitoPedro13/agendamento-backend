import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Patient } from '../patient/patient.entity';
import { Psychologist } from '../psychologist/psychologist.entity';

@ObjectType()
@Entity()
export class Appointment {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  startTime: Date;

  @Field()
  @Column()
  endTime: Date;

  @Field(() => Patient)
  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @Field(() => Psychologist)
  @ManyToOne(() => Psychologist, (psychologist) => psychologist.appointments)
  @JoinColumn({ name: 'psychologist_id' })
  psychologist: Psychologist;
}
