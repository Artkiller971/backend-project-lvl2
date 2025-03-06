import _ from 'lodash';
const space = ' ';
const separator = {
  unchanged: '  ',
  added: '+ ',
  deleted: '- ',
};

const renderObject = (key, value, depth, status = 'unchanged') => {
  if (value.content === undefined) {
    if (!(_.isPlainObject(value))) {
      return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: ${value}\n`;
    }
    const content = Object.entries(value)
      .map((([key1, value1]) => renderObject(key1, value1, depth + 1, 'unchanged')))
      .join('');
    return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: {\n${content}${space.repeat(depth * 4)}}\n`;
  }
  if (!(_.isPlainObject(value.content))) {
    return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: ${value.content}\n`;
  }

  const content = Object.entries(value.content)
    .map((([key1, value1]) => renderObject(key1, value1, depth + 1, 'unchanged')))
    .join('');

  return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: {\n${content}${space.repeat(depth * 4)}}\n`;
};

const renderChangedObject = (key, value, depth, status) => {
  if (!(_.isPlainObject(value))) {
    if (status === 'added') {
      return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: ${value}\n`;
    }
    return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: ${value}\n`;
  }
  const content = Object.entries(value)
    .map((([key, value]) => renderChangedObject(key, value, depth + 1, 'unchanged')))
    .join('');

  return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: {\n${content}${space.repeat(depth * 4)}}\n`;
};

export default (difference) => {
  const iter = (key, value, depth) => {
    if (_.has(value, 'children')) {
      const children = Object.entries(value.children)
        .map(([key, value]) => iter(key, value, depth + 1))
        .join('');

      return `${space.repeat(depth * 4 - 2)}${separator[value.status]}${key}: {\n${children}${space.repeat(depth * 4)}}\n`;
    }

    if (value.status === 'changed') {
      const from = renderChangedObject(key, value.from, depth, 'deleted');
      const to = renderChangedObject(key, value.to, depth, 'added');
      return `${from}${to}`;
    }

    return renderObject(key, value, depth, value.status);
  };

  const result = Object.entries(difference)
    .map(([key, value]) => iter(key, value, 1))
    .join('');

  return `{\n${result}}`;
};
