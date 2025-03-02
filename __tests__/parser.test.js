import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import * as fs from 'node:fs';

import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

let jsonfile;

beforeEach(() => {
  jsonfile = fs.readFileSync(getFixturePath('json1.json'), 'utf-8').trim();
});

test('parser', () => {
  const expected = JSON.parse(jsonfile);
  const actual = parse(getFixturePath('json1.json'));
  expect(actual).toEqual(expected);
});

test('unsupported format', () => {
  const unsupportedFormatPath = getFixturePath('unsupported.format');
  expect(() => {
    parse(unsupportedFormatPath, 'unsupported format');
  }).toThrow();
});
