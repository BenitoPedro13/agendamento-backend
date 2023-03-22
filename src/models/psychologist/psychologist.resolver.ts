import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Psychologist } from './psychologist.entity';
import { PsychologistService } from './psychologist.service';

@Resolver(() => Psychologist)
export class PsychologistResolver {
  constructor(private psychologistService: PsychologistService) {}

  @Query(() => Psychologist)
  async getPsychologist(@Args('id') id: number): Promise<Psychologist> {
    return this.psychologistService.findOneById(id);
  }

  @Query(() => [Psychologist])
  async getAllPsychologists(): Promise<Psychologist[]> {
    return this.psychologistService.findAll();
  }

  @Mutation(() => Psychologist)
  async createPsychologist(@Args('name') name: string): Promise<Psychologist> {
    return this.psychologistService.create({ name });
  }

  @Mutation(() => Psychologist)
  async updatePsychologist(
    @Args('id') id: number,
    @Args('name') name: string,
  ): Promise<Psychologist> {
    return this.psychologistService.update(id, { name });
  }

  @Mutation(() => Boolean)
  async deletePsychologist(@Args('id') id: number): Promise<boolean> {
    return this.psychologistService.delete(id);
  }
}
