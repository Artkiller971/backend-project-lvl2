import yaml from 'js-yaml';

const parsingTypesMapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  yaml: yaml.safeLoad,
};

export default (data, type) => {
  const parser = parsingTypesMapping[type];
  return parser(data);
};
