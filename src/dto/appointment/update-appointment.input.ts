import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, Min } from 'class-validator';

@InputType()
export class UpdateAppointmentInput {
  @Field({ nullable: true })
  @IsDate()
  startTime?: Date;

  @Field({ nullable: true })
  @IsDate()
  endTime?: Date;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  patientId?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  psychologistId?: number;
}
