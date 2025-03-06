import stylishFormatter from './formatters/stylish.js';
import plainFormatter from './formatters/plain.js';
import jsonFormatter from './formatters/jsonFormatter.js';

export default (format) => {
  switch (format) {
    case 'stylish': {
      return stylishFormatter;
    }
    case 'plain': {
      return plainFormatter;
    }
    case 'json': {
      return jsonFormatter;
    }
    default: {
      return stylishFormatter;
    }
  }
};
