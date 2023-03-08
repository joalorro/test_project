import { Controller, Get } from '@nestjs/common';
import { ExamplesService } from './examples.service';

@Controller('example')
export class ExamplesController {
  constructor(private readonly ExamplesService: ExamplesService) {}

  @Get()
  getExample() {}
}
