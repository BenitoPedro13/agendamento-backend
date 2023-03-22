import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentInput } from '../../dto/appointment/create-appointment.input';
import { UpdateAppointmentInput } from '../../dto/appointment/update-appointment.input';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async getAppointment(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentService.findOneById(id);
  }

  @Post()
  async createAppointment(
    @Body() data: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.create(data);
  }

  @Put(':id')
  async updateAppointment(
    @Param('id') id: number,
    @Body() data: UpdateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, data);
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: number): Promise<boolean> {
    return this.appointmentService.delete(id);
  }
}
