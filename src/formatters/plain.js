import _ from 'lodash';

const getValue = (object) => {
  if (!(_.isPlainObject(object))) {
    if (typeof object === 'string') {
      return `'${object}'`;
    }
    return object;
  }

  return '[complex value]';
};

const getName = (ancestry, currentKey) => {
  if (ancestry === '') {
    return currentKey;
  }
  return `${ancestry}.${currentKey}`;
};

export default (difference) => {
  const iter = (item, ancestry) => {
    if (_.has(item, 'children')) {
      const newAncestry = getName(ancestry, item.key);
      const children = item.children
        .map((child) => iter(child, newAncestry))
        .join('');

      return children;
    }
    if (item.status === 'added') {
      return `Property '${getName(ancestry, item.key)}' was added with value: ${getValue(item.value)}\n`;
    }

    if (item.status === 'deleted') {
      return `Property '${getName(ancestry, item.key)}' was removed\n`;
    }

    if (item.status === 'changed') {
      const from = getValue(item.oldValue);
      const to = getValue(item.newValue);
      return `Property '${getName(ancestry, item.key)}' was updated. From ${from} to ${to}\n`;
    }

    return undefined;
  };

  const result = difference
    .map((item) => iter(item, ''))
    .join('')
    .trim();

  return result;
};
