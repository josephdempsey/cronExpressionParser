import { cronExpressionParser, limits } from '../../app/cronExpressionParser';

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

  it('should throw if hour command line arguments are invalid', async (done) => {
    try {
      cronExpressionParser('15 invalid 1,15 * 1-5 /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Invalid hour value: NaN');
      done();
    }
  });

  it('should throw if day of the month command line arguments are invalid', async (done) => {
    try {
      cronExpressionParser('15 0 1,invalid * 1-5 /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Invalid dayOfTheMonth value: NaN');
      done();
    }
  });

  it('should throw if month command line arguments are invalid', async (done) => {
    try {
      cronExpressionParser('15 0 1,15 invalid 1-5 /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Invalid month value: NaN');
      done();
    }
  });

  it('should throw if day of the week command line arguments are invalid', async (done) => {
    try {
      cronExpressionParser('15 0 1,15 * invalid /usr/bin/find');
    } catch (error) {
      expect(error.message).toEqual('Invalid dayOfTheWeek value: NaN');
      done();
    }
  });
});

describe('Cron Minute Parser', () => {
  it('should return entire minute range 0-59', async (done) => {
    debugger;
    const result = cronExpressionParser('* 0 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 5: 5 };

    for (let i = limits.minute.min; i < limits.minute.max + 1; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return range with 1-15', async (done) => {
    debugger;
    const result = cronExpressionParser('1-15 0 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { };

    for (let i = 1; i <= 15; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return step value every 20 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('*/20 0 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 0: 0, 20: 20, 40: 40 };

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('1,5 0 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 5: 5 };

    console.log('result', result);
    console.log('range', range);

    expect(result.minute).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 45-55 & every 20 minutes', async (done) => {
    debugger;
    const result = cronExpressionParser('1-5,45-55,*/20 0 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 20: 20, 40: 40, 45: 45, 46: 46, 47: 47, 48: 48, 49: 49, 50: 50, 51: 51, 52: 52, 53: 53, 54: 54, 55: 55 };

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
    const range: { [ key: number ]: number } = { };

    for (let i = limits.hour.min; i < limits.hour.max + 1; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return range with 1-12', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1-12 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { };

    for (let i = 1; i <= 12; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return step value every 4 hours', async (done) => {
    debugger;
    const result = cronExpressionParser('1 */4 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {
      0: 0, 4: 4, 8: 8, 12: 12, 16: 16, 20: 20,
    };

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 hour', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1,5 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 5: 5 };

    console.log('result', result);
    console.log('range', range);

    expect(result.hour).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 15-20 & every 10 hours', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1-5,15-20,*/10 1,15 * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 10: 10, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19, 20: 20,
    };

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
    const range: { [ key: number ]: number } = {};

    for (let i = limits.month.min; i < limits.month.max + 1; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return range with 1-10', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1-10 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {};

    for (let i = 1; i <= 10; i++) {
      range[i] = i;
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
    const range: { [ key: number ]: number } = { 4: 4, 8: 8, 12: 12 };

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return comma separated values on 1 & 5 month', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1,5 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 5: 5 };

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 10-12 & every 4 month', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1-5,10-12,*/4 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 8: 8, 10: 10, 11: 11, 12: 12,
    };

    console.log('result', result);
    console.log('range', range);

    expect(result.month).toEqual(range);
    done();
  });
});

describe('Cron Day of the Month Parser', () => {
  it('should return entire minute range 1-31', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 * * 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {};

    for (let i = limits.dayOfTheMonth.min; i < limits.dayOfTheMonth.max + 1; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheMonth).toEqual(range);
    done();
  });

  it('should return range with 1-15', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1-15 1-10 1-5 /usr/bin/find');

    const range: { [ key: number ]: number } = {};

    for (let i = 1; i <= 15; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheMonth).toEqual(range);
    done();
  });

  // step value on month start with from 1? then go 4, different from min/hour
  it('should return step value every 10 days', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 */10 */4 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 10: 10, 20: 20, 30: 30 };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheMonth).toEqual(range);
    done();
  });

  it('should return comma separated values on 1st & 15th day', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1,15 1,5 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 15: 15 };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheMonth).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-5 & 10-12 & every 10 day', async (done) => {
    debugger;
    const result = cronExpressionParser('* * 1-5,10-12,*/10 * * /usr/bin/find');
    const range: { [ key: number ]: number } = {
      1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 10: 10, 11: 11, 12: 12, 20: 20, 30: 30,
    };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheMonth).toEqual(range);
    done();
  });
});

describe('Cron Day of the Week Parser', () => {
  it('should return entire minute range 1-7', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1 1 * /usr/bin/find');
    const range: { [ key: number ]: number } = {};

    for (let i = limits.dayOfTheWeek.min; i < limits.dayOfTheWeek.max + 1; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheWeek).toEqual(range);
    done();
  });

  it('should return range with 1-5', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1 1 1-5 /usr/bin/find');
    const range: { [ key: number ]: number } = {};

    for (let i = 1; i <= 5; i++) {
      range[i] = i;
    }

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheWeek).toEqual(range);
    done();
  });

  // step value on month start with from 1? then go 4, different from min/hour
  it('should return step value every 2 days', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1 1 */2 /usr/bin/find');
    const range: { [ key: number ]: number } = { 2: 2, 4: 4, 6: 6 };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheWeek).toEqual(range);
    done();
  });

  it('should return comma separated values on 1st & 4th day', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1 1 1,4 /usr/bin/find');
    const range: { [ key: number ]: number } = { 1: 1, 4: 4 };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheWeek).toEqual(range);
    done();
  });

  it('should return comma separated ranges between 1-2 & 4-5 & every 2 days', async (done) => {
    debugger;
    const result = cronExpressionParser('1 1 1 1 1-2,4-5,*/2 /usr/bin/find');
    const range: { [ key: number ]: number } = {
      1: 1, 2: 2, 4: 4, 5: 5, 6: 6,
    };

    console.log('result', result);
    console.log('range', range);

    expect(result.dayOfTheWeek).toEqual(range);
    done();
  });
});
