import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, Min, ArrayNotEmpty } from 'class-validator';

@InputType()
export class DeleteAppointmentsInput {
  @Field(() => [Int])
  @IsInt({ each: true })
  @Min(1, { each: true })
  @ArrayNotEmpty()
  ids: number[];
}
