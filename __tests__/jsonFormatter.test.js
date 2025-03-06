import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

import generateDiffObject from '../src/generateDiff.js';
import jsonFormatter from '../src/formatters/jsonFormatter.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const json1Path = getFixturePath('json1.json');
const json2Path = getFixturePath('json2.json');
const yaml1Path = getFixturePath('yaml1.yaml');
const yaml2Path = getFixturePath('yaml2.yml');

test('generateDiff json', () => {
  const diffObject = generateDiffObject(parse(json1Path), parse(json2Path));
  const expected = JSON.stringify(diffObject, null, 2);
  const actual = jsonFormatter(diffObject);
  expect(actual).toEqual(expected);
});

test('generateDiff yaml', () => {
  const diffObject = generateDiffObject(parse(yaml1Path), parse(yaml2Path));
  const expected = JSON.stringify(diffObject, null, 2);
  const actual = jsonFormatter(diffObject);
  expect(actual).toEqual(expected);
});

test('generateDiff yaml and json', () => {
  const diffObject = generateDiffObject(parse(json1Path), parse(yaml2Path));
  const expected = JSON.stringify(diffObject, null, 2);
  const actual = jsonFormatter(diffObject);
  expect(actual).toEqual(expected);
});
