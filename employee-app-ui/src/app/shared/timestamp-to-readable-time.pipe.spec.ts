import { TimestampToReadableTimePipe } from './timestamp-to-readable-time.pipe';

describe('TimestampToReadableTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampToReadableTimePipe();
    expect(pipe).toBeTruthy();
  });
});
