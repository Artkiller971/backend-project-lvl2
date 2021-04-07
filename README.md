### Hexlet tests and linter status:
[![Actions Status](https://github.com/Artkiller971/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Artkiller971/backend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/f35cd9e113874f157555/maintainability)](https://codeclimate.com/github/Artkiller971/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f35cd9e113874f157555/test_coverage)](https://codeclimate.com/github/Artkiller971/backend-project-lvl2/test_coverage)
![Node CI](https://github.com/Artkiller971/backend-project-lvl1/workflows/Node%20CI/badge.svg)

A tool for comparing configuration files

## Installation

Clone the repository, run `npm link` from inside the repository.

## Usage

Use `gendiff -h` for help.

General use: `gendiff <file> <file>`

Files must be of these extensions: .json, .yml.

Use -f (--format) flag to choose output format: `gendiff -f plain <file> <file>`

Possible formats are: stylish (default), plain, json.

## Asciinema
[![asciicast](https://asciinema.org/a/6gLcQE6lJBssFcgOofGnXNN3A.svg)](https://asciinema.org/a/LroOH4GOzT11BvfWvYlZBkTUg)