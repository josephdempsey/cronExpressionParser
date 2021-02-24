import commandLineArgs from 'command-line-args';
import { cronExpressionParser } from './cronExpressionParser';

const optionDefinitions = [
  { name: 'input', alias: 'i', type: String },
];

export = (() => {
  const options = commandLineArgs(optionDefinitions);

  cronExpressionParser(options.input);
})()
