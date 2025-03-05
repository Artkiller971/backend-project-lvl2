import _ from 'lodash';

export const generateDiffObject = (object1, object2) => {
  const allkeys = _.uniq(_.union(Object.keys(object1), Object.keys(object2))).sort();
  const result = allkeys.reduce((acc, current) => {
    acc[current] = {};
    if (_.has(object1, current) && _.has(object2, current)) {
      if(_.isPlainObject(object1[current]) && _.isPlainObject(object2[current])) {
        acc[current].status = 'unchanged';
        acc[current].children = generateDiffObject(object1[current], object2[current]);
        return acc;
      }
      if (object1[current] === object2[current]) {
        acc[current].status = 'unchanged';
        acc[current].content = object1[current];
      } else {
        acc[current].status = 'changed';
        acc[current].from = object1[current];
        acc[current].to = object2[current];
      }
      return acc;
    };

    if (_.has(object1, current)) {
      acc[current].status = 'deleted';
      acc[current].content = _.cloneDeep(object1[current]);
      return acc;
    };

    acc[current].status = 'added';
    acc[current].content = _.cloneDeep(object2[current]);
    return acc;

  }, {});

  return result;
};
