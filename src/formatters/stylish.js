import _ from 'lodash';

const makeIndent = (depthLevel) => {
  const tabSize = 4;
  const indentSize = tabSize * depthLevel;
  const indent = {
    normal: ' '.repeat(indentSize),
    plus: ' '.repeat(indentSize - 2).concat('+ '),
    minus: ' '.repeat(indentSize - 2).concat('- '),
    higher: ' '.repeat(indentSize - tabSize),
    lower: ' '.repeat(indentSize + depthLevel),
  };

  return indent;
};

const stringifyValue = (data, depthLevel) => {
  if (_.isNull(data)) {
    return 'null';
  }

  if (!_.isObject(data)) {
    return data.toString();
  }

  const indent = makeIndent(depthLevel);
  const lines = Object.entries(data)
    .map(([key, value]) => `${indent.normal}${key}: ${stringifyValue(value, depthLevel + 1)}`);

  return `{\n${lines.join('\n')}\n${indent.higher}}`;
};

const styleFormat = (arrayOfDiffs) => {
  const iter = (node, depthLevel) => {
    const indent = makeIndent(depthLevel);

    const renderNode = ({
      key, status, value, children, oldValue, newValue,
    }) => {
      switch (status) {
        case 'unchanged':
          return `${indent.normal}${key}: ${stringifyValue(value, depthLevel + 1)}`;
        case 'removed':
          return `${indent.minus}${key}: ${stringifyValue(value, depthLevel + 1)}`;
        case 'added':
          return `${indent.plus}${key}: ${stringifyValue(value, depthLevel + 1)}`;
        case 'updated':
          return `${indent.minus}${key}: ${stringifyValue(oldValue, depthLevel + 1)}\n${indent.plus}${key}: ${stringifyValue(newValue, depthLevel + 1)}`;
        case 'nested':
          return `${indent.normal}${key}: ${iter(children, depthLevel + 1)}`;
        default:
          return 'kek';
      }
    };

    const lines = node.map(renderNode);
    return `{\n${lines.join('\n')}\n${indent.higher}}`;
  };

  return iter(arrayOfDiffs, 1);
};

export default styleFormat;
