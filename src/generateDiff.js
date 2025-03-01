import _ from 'lodash';

export default (object1, object2) => {
  const allkeys = _.uniq(_.union(Object.keys(object1), Object.keys(object2))).sort();
  const result = allkeys.reduce((acc, current) => {
    if (_.has(object1, current)) {
      if(_.has(object2, current)) {
        if(!_.isEqual(object1[current], object2[current])) {
          acc += `  - ${current}: ${object1[current]}\n  + ${current}: ${object2[current]}\n`;
          return acc;
        }
        acc += `    ${current}: ${object1[current]}\n`;
        return acc;
      }
      acc += `  - ${current}: ${object1[current]}\n`;
      return acc;
    }
    acc += `  + ${current}: ${object2[current]}\n`;
    return acc;
  }, '');

  return `{\n${result}}`;
};
