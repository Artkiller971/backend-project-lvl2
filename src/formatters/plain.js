import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (!_.isObject(value)) {
    return `${value}`;
  }

  return '[complex value]';
};

const styleFormat = (arrayOfDiffs, path = '') => {
  const renderNode = ({
    key, status, value, children, newValue, oldValue,
  }) => {
    const pathToKey = `${path}${key}`;
    switch (status) {
      case 'removed':
        return `Property '${pathToKey}' was removed`;
      case 'added':
        return `Property '${pathToKey}' was added with value: ${stringifyValue(value)}`;
      case 'unchanged':
        return null;
      case 'updated':
        return `Property '${pathToKey}' was updated. From ${stringifyValue(oldValue)} to ${stringifyValue(newValue)}`;
      case 'nested':
        return styleFormat(children, `${pathToKey}.`);
      default:
        return 'qeq';
    }
  };

  const lines = arrayOfDiffs.map(renderNode).filter((line) => line);
  return `${lines.join('\n')}`;
};

export default styleFormat;
