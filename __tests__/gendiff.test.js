/* eslint-disable no-undef */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('nested stylish', () => {
  const expected = fs.readFileSync(getFixturePath('expectedStylish.txt'), 'utf-8');
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yml');
  const actual = genDiff(path1, path2);

  expect(actual).toEqual(expected);
});

test('nested plain', () => {
  const expected = fs.readFileSync(getFixturePath('expectedPlain.txt'), 'utf-8');
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yml');
  const actual = genDiff(path1, path2, 'plain');

  expect(actual).toEqual(expected);
});

test('nested json', () => {
  const expected = fs.readFileSync(getFixturePath('expectedJson.json'), 'utf-8');
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.yml');
  const actual = genDiff(path1, path2, 'json');

  expect(actual).toEqual(expected);
});
