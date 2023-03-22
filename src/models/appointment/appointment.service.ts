import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentInput } from '../../dto/appointment/create-appointment.input';
import { UpdateAppointmentInput } from '../../dto/appointment/update-appointment.input';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOneById(id: number): Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async create(data: CreateAppointmentInput): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(data);
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
}
