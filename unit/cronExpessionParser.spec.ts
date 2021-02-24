import { cronExpressionParser } from '../app/cronExpressionParser';

describe('Cron Expression Parser valid fields', () => {
  it('should throw if cron field is missing', async (done) => {
    try {
      cronExpressionParser('*/15 0 1,15 1-5 /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Missing cron field');
      done();
    }
  });

  it('should throw if minute command line arguments are invalid', async (done) => {
    try {
      cronExpressionParser('invalid 0 1,15 * 1-5 /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Invalid minute value');
      done();
    }
  });
});
