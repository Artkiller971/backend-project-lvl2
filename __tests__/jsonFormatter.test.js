import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import * as fs from 'node:fs';

import { generateDiffObject } from '../src/generateDiff.js';
import jsonFormatter from '../src/formatters/jsonFormatter.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let json1Path;
let json2Path;
let yaml1Path;
let yaml2Path;
let expected;

beforeAll(() => {
  json1Path = getFixturePath('json1.json');
  json2Path = getFixturePath('json2.json');
  yaml1Path = getFixturePath('yaml1.yaml');
  yaml2Path = getFixturePath('yaml2.yml');
});

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
