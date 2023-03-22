import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';

@Resolver(() => Patient)
export class PatientResolver {
  constructor(private patientService: PatientService) {}

  @Query(() => Patient)
  async getPatient(@Args('id') id: number): Promise<Patient> {
    return this.patientService.findOneById(id);
  }

  @Query(() => [Patient])
  async getAllPatients(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Mutation(() => Patient)
  async createPatient(@Args('name') name: string): Promise<Patient> {
    return this.patientService.create({ name });
  }

  @Mutation(() => Patient)
  async updatePatient(
    @Args('id') id: number,
    @Args('name') name: string,
  ): Promise<Patient> {
    return this.patientService.update(id, { name });
  }

  @Mutation(() => Boolean)
  async deletePatient(@Args('id') id: number): Promise<boolean> {
    return this.patientService.delete(id);
  }
}
