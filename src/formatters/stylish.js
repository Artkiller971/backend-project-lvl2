import _ from 'lodash';
const space = ' ';
const separator = {
  unchanged: '  ',
  nested: '  ',
  added: '+ ',
  deleted: '- ',
};

const renderObject = (key, value, depth, status = 'unchanged') => {
  if (!(_.isPlainObject(value))) {
    return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: ${value}\n`;
  }
  const content = Object.entries(value)
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
    .map((([key1, value1]) => renderChangedObject(key1, value1, depth + 1, 'unchanged')))
    .join('');

  return `${space.repeat(depth * 4 - 2)}${separator[status]}${key}: {\n${content}${space.repeat(depth * 4)}}\n`;
};

export default (difference) => {
  const iter = (item, depth) => {
    if (item.status === 'nested') {
      const children = item.children
        .map((child) => iter(child, depth + 1))
        .join('');

      return `${space.repeat(depth * 4 - 2)}${separator[item.status]}${item.key}: {\n${children}${space.repeat(depth * 4)}}\n`;
    }

    if (item.status === 'changed') {
      const from = renderChangedObject(item.key, item.oldValue, depth, 'deleted');
      const to = renderChangedObject(item.key, item.newValue, depth, 'added');
      return `${from}${to}`;
    }

    return renderObject(item.key, item.value, depth, item.status);
  };

  const result = difference
    .map((item) => iter(item, 1))
    .join('');

  return `{\n${result}}`;
};
