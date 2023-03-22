import { Controller, Get, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appointmentService.findOneById(+id);
  }
}
