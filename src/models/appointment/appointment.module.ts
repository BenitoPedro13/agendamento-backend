import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentResolver } from './appointment.resolver';
import { AppointmentService } from './appointment.service';
import { PatientModule } from '../patient/patient.module';
import { PsychologistModule } from '../psychologist/psychologist.module';
import { AppointmentController } from './appointment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientModule,
    PsychologistModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, AppointmentResolver],
  exports: [AppointmentService],
})
export class AppointmentModule {}
