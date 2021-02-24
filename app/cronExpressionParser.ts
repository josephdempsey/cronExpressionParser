import { parseCronValue } from './parseCronValue';

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
