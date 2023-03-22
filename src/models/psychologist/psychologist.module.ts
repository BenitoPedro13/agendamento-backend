import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PsychologistController } from './psychologist.controller';
import { Psychologist } from './psychologist.entity';
import { PsychologistResolver } from './psychologist.resolver';
import { PsychologistService } from './psychologist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Psychologist])],
  providers: [PsychologistService, PsychologistResolver],
  controllers: [PsychologistController],
  exports: [PsychologistService],
})
export class PsychologistModule {}
