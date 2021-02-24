/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
export const limits = {
  minute: {
    min: 0,
    max: 59,
  },
  hour: {
    min: 0,
    max: 23,
  },
  dayOfTheMonth: {
    min: 1,
    max: 31,
  },
  month: {
    min: 1,
    max: 12,
  },
  dayOfTheWeek: {
    min: 1,
    max: 7,
  },
};

type TimeMetricType = 'minute'| 'hour'| 'dayOfTheMonth' | 'month' | 'dayOfTheWeek';

const rangeBetween = (value: string, minValue: number, maxValue: number, minuteResult: { [key: number]: number; }) => {
  const range = value.split('-');
  const parsedMinRange = parseInt(range[0], 10);
  const parsedMaxRange = parseInt(range[1], 10);

  if ((parsedMinRange < minValue || parsedMinRange > maxValue)
    || (parsedMaxRange < minValue || parsedMaxRange > maxValue)) {
    throw new Error(`Invalid range: ${range}`);
  }

  for (let i = parsedMinRange; i <= parsedMaxRange; i++) {
    // eslint-disable-next-line no-param-reassign
    minuteResult[i] = i;
  }
};

const stepValues = (value: string, minValue: number, maxValue: number, minuteResult: { [key: number]: number; }) => {
  const stepValue = value.split('/');

  const parsedStepValue = parseInt(stepValue[1], 10);

  if (stepValue[0] !== '*' && !Number.isNaN(parsedStepValue) && Math.sign(parsedStepValue) !== -1) {
    throw new Error(`Invalid step value: ${stepValue}`);
  }

  for (let i = minValue; i <= maxValue; i++) {
    if (i % parsedStepValue === 0) {
      // eslint-disable-next-line no-param-reassign
      minuteResult[i] = i;
    }
  }
};

const parseCronValue = (cronValue: string, timeMetric: TimeMetricType) => {
  const minuteResult: { [ key: number ]: number } = {};
  const minValue = limits[timeMetric].min;
  const maxValue = limits[timeMetric].max;

  if (cronValue === '*') {
    for (let i = minValue; i <= maxValue; i++) {
      minuteResult[i] = i;
    }

    return minuteResult;
  }

  const values = cronValue.split(',');

  if (values.length === 1) {
    if (values[0].includes('-')) {
      rangeBetween(values[0], minValue, maxValue, minuteResult);

      return minuteResult;
    }

    if (values[0].includes('/')) {
      stepValues(values[0], minValue, maxValue, minuteResult);

      return minuteResult;
    }
  }

  if (values.length > 1) {
    for (let i = 0; i < values.length; i++) {
      if (values[i].includes('-')) {
        rangeBetween(values[i], minValue, maxValue, minuteResult);

        continue;
      }

      if (values[i].includes('/')) {
        stepValues(values[i], minValue, maxValue, minuteResult);

        continue;
      }

      const parsedMinute = parseInt(values[i], 10);

      if (!Number.isNaN(parsedMinute) && Math.sign(parsedMinute) !== -1) {
        minuteResult[parsedMinute] = parsedMinute;

        continue;
      }
      throw new Error(`Invalid ${timeMetric} value: ${parsedMinute}`);
    }

    return minuteResult;
  }

  const parsedMinute = parseInt(cronValue, 10);

  if (!Number.isNaN(parsedMinute) && Math.sign(parsedMinute) !== -1) {
    minuteResult[parsedMinute] = parsedMinute;

    return minuteResult;
  }
  throw new Error(`Invalid ${timeMetric} value: ${parsedMinute}`);
};

export const cronExpressionParser = (input: string) => {
  const commands = input.split(' ');

  if (commands.length !== 6) {
    throw new Error('Missing cron field');
  }

  const cronCommandDetails = {
    minute: parseCronValue(commands[0], 'minute'),
    hour: parseCronValue(commands[1], 'hour'),
    dayOfTheMonth: parseCronValue(commands[2], 'dayOfTheMonth'),
    month: parseCronValue(commands[3], 'month'),
    dayOfTheWeek: parseCronValue(commands[4], 'dayOfTheWeek'),
    commandToRun: [commands[5]],
  };

  console.table(cronCommandDetails);

  return cronCommandDetails;
};
