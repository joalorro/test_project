import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { ExamplesService } from './examples.service';

@Controller('examples')
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  @Get()
  getExamples() {
    return this.examplesService.getExamples();
  }

  @Post()
  postExamples(@Body(new ParseArrayPipe({ items: Number })) data: number[]) {
    return this.examplesService.postExamples(data);
  }
}
