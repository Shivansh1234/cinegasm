import { CsvToArrayPipe } from './csv-to-array.pipe';

describe('CsvToArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new CsvToArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
