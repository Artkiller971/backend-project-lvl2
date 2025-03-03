import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import * as fs from 'node:fs';

import generateDiff from '../src/generateDiff.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
let json1Path;
let json2Path;
let yaml1Path;
let yaml2Path;
let expected;

beforeEach(() => {
  json1Path = getFixturePath('json1.json');
  json2Path = getFixturePath('json2.json');
  yaml1Path = getFixturePath('yaml1.yaml');
  yaml2Path = getFixturePath('yaml2.yml');
  expected = fs.readFileSync(getFixturePath('json1-2diff.txt'), 'utf-8').trim();
});

test('generateDiff json', () => {
  const actual = generateDiff(parse(json1Path), parse(json2Path));
  expect(actual).toEqual(expected);
});

test('generateDiff yaml', () => {
  const actual = generateDiff(parse(yaml1Path), parse(yaml2Path));
  expect(actual).toEqual(expected);
});

test('generateDiff yaml and json', () => {
  const actual = generateDiff(parse(json1Path), parse(yaml2Path));
  expect(actual).toEqual(expected);
});
