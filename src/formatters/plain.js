import _ from 'lodash';

const getValue = (object) => {
  if (!(_.isPlainObject(object))) {
    if (typeof object === 'string') {
      return `'${object}'`;
    };
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
  const iter = (key, value, ancestry) => {
    if (_.has(value, 'children')) {
      const newAncestry = getName(ancestry, key);
      const children = Object.entries(value.children)
        .map(([key, value]) => iter(key, value, newAncestry))
        .join('');

      return children;
    }
    if (value.status === 'added') {
      return `Property '${getName(ancestry, key)}' was added with value: ${getValue(value.content)}\n`;
    }

    if (value.status === 'deleted') {
      return `Property '${getName(ancestry, key)}' was removed\n`;
    }

    if (value.status === 'changed') {
      const from = getValue(value.from);
      const to = getValue(value.to);
      return `Property '${getName(ancestry, key)}' was updated. From ${from} to ${to}\n`;
    }

    return undefined;
  };

  const result = Object.entries(difference)
    .map(([key, value]) => iter(key, value, ''))
    .join('')
    .trim();

  return result;
};
