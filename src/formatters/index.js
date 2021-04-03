import stylishFormatter from './stylish.js';

const formatsMapping = {
  stylish: stylishFormatter,
};

export default (formatType) => formatsMapping[formatType];
