import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ExamplesService {
  @Get()
  getExamples() {
    return [1, 2, 3];
  }
}
