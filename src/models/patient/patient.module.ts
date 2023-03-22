import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './patient.controller';
import { Patient } from './patient.entity';
import { PatientResolver } from './patient.resolver';
import { PatientService } from './patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientService, PatientResolver],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
