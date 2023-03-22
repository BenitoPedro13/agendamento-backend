import { Controller, Get, Param } from '@nestjs/common';
import { PsychologistService } from './psychologist.service';

@Controller('psychologists')
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  @Get()
  async findAll() {
    return this.psychologistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.psychologistService.findOneById(+id);
  }
}
