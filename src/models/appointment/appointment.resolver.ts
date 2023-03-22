import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentInput } from '../../dto/appointment/create-appointment.input';
import { UpdateAppointmentInput } from '../../dto/appointment/update-appointment.input';
import { DeleteAppointmentsInput } from '../../dto/appointment/delete-appointments.input';

@Resolver(() => Appointment)
export class AppointmentResolver {
  constructor(private appointmentService: AppointmentService) {}

  @Query(() => Appointment)
  async getAppointment(@Args('id') id: number): Promise<Appointment> {
    return this.appointmentService.findOneById(id);
  }

  @Query(() => [Appointment])
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Mutation(() => Appointment)
  async createAppointment(
    @Args('data') data: CreateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.create(data);
  }

  @Mutation(() => Appointment)
  async updateAppointment(
    @Args('id') id: number,
    @Args('data') data: UpdateAppointmentInput,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, data);
  }

  @Mutation(() => Boolean)
  async deleteAppointment(@Args('id') id: number): Promise<boolean> {
    return this.appointmentService.delete(id);
  }

  @Mutation(() => [Boolean])
  async deleteAppointments(
    @Args('ids') ids: DeleteAppointmentsInput,
  ): Promise<boolean[]> {
    return this.appointmentService.deleteAppointments(ids);
  }
}
