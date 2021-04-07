import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';
import jsonFormatter from './json.js';

const formatsMapping = {
  stylish: stylishFormatter,
  plain: plainFormatter,
  json: jsonFormatter,
};

export default (formatType) => formatsMapping[formatType];
