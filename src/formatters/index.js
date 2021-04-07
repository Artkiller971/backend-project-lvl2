import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

const formatsMapping = {
  stylish: stylishFormatter,
  plain: plainFormatter,
};

export default (formatType) => formatsMapping[formatType];
