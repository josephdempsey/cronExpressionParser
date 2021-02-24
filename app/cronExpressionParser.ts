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

const parseMinute = (cronValue: string) => {
  const minuteResult = [];

  if (cronValue === '*') {
    for (let i = limits.minute.min; i <= limits.minute.max; i++) {
      minuteResult.push(i);
    }

    return minuteResult;
  }

  const values = cronValue.split(',');

  if (values.length === 1) {
    if (values[0].includes('-')) {
      const range = values[0].split('-');
      const parsedMinRange = parseInt(range[0], 10);
      const parsedMaxRange = parseInt(range[1], 10);

      if ((parsedMinRange < limits.minute.min || parsedMinRange > limits.minute.max)
                || (parsedMaxRange < limits.minute.min || parsedMaxRange > limits.minute.max)) {
        throw new Error(`Invalid range: ${range}`);
      }

      for (let i = parsedMinRange; i <= parsedMaxRange; i++) {
        minuteResult.push(i);
      }

      return minuteResult;
    }

    if (values[0].includes('/')) {
      const stepValue = values[0].split('/');

      const parsedStepValue = parseInt(stepValue[1], 10);

      if (stepValue[0] !== '*' && !Number.isNaN(parsedStepValue) && Math.sign(parsedStepValue) !== -1) {
        throw new Error(`Invalid step value: ${stepValue}`);
      }

      for (let i = limits.minute.min; i <= limits.minute.max; i++) {
        if (i % parsedStepValue === 0) {
          minuteResult.push(i);
        }
      }

      return minuteResult;
    }
  }

  if (values.length > 1) {
    for (let i = 0; i < values.length; i++) {
      // refactor to remove duplicates
      if (values[i].includes('-')) {
        const range = values[i].split('-');
        const parsedMinRange = parseInt(range[0], 10);
        const parsedMaxRange = parseInt(range[1], 10);

        if ((parsedMinRange < limits.minute.min || parsedMinRange > limits.minute.max)
                    || (parsedMaxRange < limits.minute.min || parsedMaxRange > limits.minute.max)) {
          throw new Error(`Invalid range: ${range}`);
        }

        for (let i = parsedMinRange; i <= parsedMaxRange; i++) {
          minuteResult.push(i);
        }

        continue;
      }

      // refactor array to object to remove duplicates
      if (values[i].includes('/')) {
        const stepValue = values[i].split('/');

        const parsedStepValue = parseInt(stepValue[1], 10);

        if (stepValue[0] !== '*' && !Number.isNaN(parsedStepValue) && Math.sign(parsedStepValue) !== -1) {
          throw new Error(`Invalid step value: ${stepValue}`);
        }

        for (let i = limits.minute.min; i <= limits.minute.max; i++) {
          if (i % parsedStepValue === 0) {
            minuteResult.push(i);
          }
        }

        continue;
      }

      const parsedMinute = parseInt(values[i], 10);

      if (!Number.isNaN(parsedMinute) && Math.sign(parsedMinute) !== -1) {
            minuteResult.push(parsedMinute);
            continue;
      }
      throw new Error(`Invalid minute value: ${parsedMinute}`);
    }

    return minuteResult;
  }

  const parsedMinute = parseInt(cronValue, 10);

  if (!Number.isNaN(parsedMinute) && Math.sign(parsedMinute) !== -1) {
    return minuteResult.push(parsedMinute);
  }
  throw new Error(`Invalid minute value: ${parsedMinute}`);
};

export const cronExpressionParser = (input: string) => {
  const commands = input.split(' ');

  if (commands.length !== 6) {
    throw new Error('Missing cron field');
  }

  const cronCommandDetails = {
    minute: parseMinute(commands[0]),
    hour: commands[1],
    dayOfTheMonth: commands[2],
    month: commands[3],
    dayOfTheWeek: commands[4],
    commandToRun: [commands[5]],
  };

  console.table(cronCommandDetails);

  return cronCommandDetails;
};
