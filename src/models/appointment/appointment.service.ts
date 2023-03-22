import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentInput } from '../../dto/appointment/create-appointment.input';
import { UpdateAppointmentInput } from '../../dto/appointment/update-appointment.input';
import { DeleteAppointmentsInput } from '../../dto/appointment/delete-appointments.input';
import { PatientService } from '../patient/patient.service';
import { PsychologistService } from '../psychologist/psychologist.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private patientService: PatientService,
    private psychologistService: PsychologistService,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['patient', 'psychologist'],
    });
  }

  async findOneById(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async create(data: CreateAppointmentInput): Promise<Appointment> {
    const patient = await this.patientService.findOneById(data.patientId);
    const psychologist = await this.psychologistService.findOneById(
      data.psychologistId,
    );

    if (!patient || !psychologist) {
      throw new Error('Patient or Psychologist not found');
    }

    const appointment = this.appointmentRepository.create({
      ...data,
      patient,
      psychologist,
    });

    return this.appointmentRepository.save(appointment);
  }

  async update(id: number, data: UpdateAppointmentInput): Promise<Appointment> {
    const appointment = await this.findOneById(id);
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    Object.assign(appointment, data);
    return this.appointmentRepository.save(appointment);
  }

  async delete(id: number): Promise<boolean> {
    const appointment = await this.findOneById(id);
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    await this.appointmentRepository.delete(id);
    return true;
  }

  async deleteAppointments(ids: DeleteAppointmentsInput): Promise<boolean[]> {
    const result = await Promise.all(
      ids.ids.map(async (id) => {
        try {
          await this.appointmentRepository.delete(id);
          return true;
        } catch (error) {
          return false;
        }
      }),
    );
    return result;
  }
}
