import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Psychologist } from './psychologist.entity';

@Injectable()
export class PsychologistService {
  constructor(
    @InjectRepository(Psychologist)
    private psychologistRepository: Repository<Psychologist>,
  ) {}

  async findAll(): Promise<Psychologist[]> {
    return this.psychologistRepository.find();
  }

  async findOneById(id: number): Promise<Psychologist> {
    return this.psychologistRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Psychologist>): Promise<Psychologist> {
    const psychologist = await this.psychologistRepository.create(data);
    return this.psychologistRepository.save(psychologist);
  }

  async update(id: number, data: Partial<Psychologist>): Promise<Psychologist> {
    const psychologist = await this.findOneById(id);
    if (!psychologist) {
      throw new Error(`Psychologist with ID ${id} not found`);
    }
    Object.assign(psychologist, data);
    return this.psychologistRepository.save(psychologist);
  }

  async delete(id: number): Promise<boolean> {
    const psychologist = await this.findOneById(id);
    if (!psychologist) {
      throw new Error(`Psychologist with ID ${id} not found`);
    }
    await this.psychologistRepository.delete(id);
    return true;
  }
}
