import { Injectable } from '@nestjs/common';

@Injectable()
export class ExamplesService {
  getExamples() {
    return [1, 2, 3];
  }

  postExamples(data: number[]): number[] {
    return data.map((num) => num + 1);
  }
}
