import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, Min } from 'class-validator';

@InputType()
export class CreateAppointmentInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  patientId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  psychologistId: number;

  @Field()
  @IsDate()
  startTime: Date;

  @Field()
  @IsDate()
  endTime: Date;
}
