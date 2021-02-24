import { cronExpressionParser, limits } from '../app/cronExpressionParser';

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
      expect(error.message).toEqual('Invalid minute value: NaN');
      done();
    }
  });
});

describe('Cron Minute Parser', () => {
  it('should return entire minute range 0-59', async (done) => {
    debugger;
    const result = cronExpressionParser('* 0 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = limits.minute.min; i < limits.minute.max + 1; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return range with 1-15', async (done) => {
    debugger;
    const result = cronExpressionParser('1-15 0 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = 1; i <= 15; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return step value every 20 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('*/20 0 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [0, 20, 40];

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('1,5 0 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [1, 5];

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 45-55 & every 5 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('1-5,45-55,*/5 0 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [1, 2, 3, 4, 5, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });
});

describe('Cron Hour Parser', () => {
  it('should return entire minute range 0-23', async (done) => {
    debugger;
    const result = cronExpressionParser('1 * 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = limits.hour.min; i < limits.hour.max + 1; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return range with 1-12', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1-12 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = 1; i <= 12; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return step value every 4 hours', async (done) => {
    debugger;
    const result = cronExpressionParser('1 */4 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [0, 4, 8, 12, 16, 20];

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 hour', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1,5 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [1, 5];

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  // TODO: Can you combine the range with step? - also need ability to remove duplicates
  it('should return comma separated ranges between 1-5 & 15-20 & every 5 hours', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1-5,15-20,*/5 1,15 * 1-5 /usr/bin/find');
    const range: Array<number> = [1, 2, 3, 4, 5, 15, 16, 17, 18, 19, 20];

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });
});

describe('Cron Month Parser', () => {
  it('should return entire minute range 1-12', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 * * 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = limits.month.min; i < limits.month.max + 1; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return range with 1-10', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1-10 1-5 /usr/bin/find');
    const range: Array<number> = [];

    for (let i = 1; i <= 10; i++) {
      range.push(i);
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  // step value on month start with from 1? then go 4, different from min/hour
  it('should return step value every 4 months', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 */4 1-5 /usr/bin/find');
    const range: Array<number> = [4, 8, 12];

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 month', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1,5 1-5 /usr/bin/find');
    const range: Array<number> = [1, 5];

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 10-12 & every 4 month', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1-5,10-12,*/4 1-5 /usr/bin/find');
    const range: Array<number> = [1, 2, 3, 4, 5, 10, 11, 12];

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });
});
