import _ from 'lodash';

const generateDiffObject = (object1, object2) => {
  const allkeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const result = allkeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if ((_.has(object1, key)) && (!_.has(object2, key))) {
      return {
        key,
        status: 'deleted',
        value: value1,
      };
    }

    if ((!_.has(object1, key)) && (_.has(object2, key))) {
      return {
        key,
        status: 'added',
        value: value2,
      };
    }

    if (value1 === value2) {
      return {
        key,
        status: 'unchanged',
        value: value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        status: 'nested',
        children: generateDiffObject(value1, value2),
      };
    }

    return {
      key,
      status: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });

  return result;
};

export default generateDiffObject;
