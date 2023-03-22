import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService extends TypeOrmCrudService<Patient> {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {
    super(patientRepository);
  }

  async deleteAll(): Promise<void> {
    await this.patientRepository.delete({});
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOneById(id: number): Promise<Patient> {
    return this.patientRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Patient>): Promise<Patient> {
    const patient = await this.patientRepository.create(data);
    return this.patientRepository.save(patient);
  }

  async update(id: number, data: Partial<Patient>): Promise<Patient> {
    const patient = await this.findOneById(id);
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    Object.assign(patient, data);
    return this.patientRepository.save(patient);
  }

  async delete(id: number): Promise<boolean> {
    const patient = await this.findOneById(id);
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    await this.patientRepository.delete(id);
    return true;
  }
}
