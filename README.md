### Hexlet tests and linter status:
[![Actions Status](https://github.com/Artkiller971/backend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Artkiller971/backend-project-lvl2/actions)
[![tests](https://github.com/Artkiller971/backend-project-lvl2/actions/workflows/test.yml/badge.svg)](https://github.com/Artkiller971/backend-project-lvl2/actions/workflows/test.yml)

# Gendiff
A tool for comparing configuration files
## Installation

Clone the repository, run `npm link` from inside the repository.

## Usage

Use `gendiff -h` for help.

General use: `gendiff <file> <file>`

Files must be of these extensions: .json, .yml.

Use -f (--format) flag to choose output format: `gendiff -f plain <file> <file>`

Possible formats are: stylish (default), plain, json.

## Examples

Consider the comparable files are:
```
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345
  }
}
```
and
```
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": 100500
  }
}
```

Expected output would be:

Stylish:
```
{
    common: {
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + follow: false
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
```

Plain:
```
Property 'common.setting2' was removed.
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From bas to bars
Property 'group1.nest' was updated. From [complex value] to str
Property 'group2' was removed.
Property 'group3' was added with value: [complex value]
```

Json:
```
{
  "common": {
    "status": "unchanged",
    "children": {
      "follow": {
        "status": "added",
        "content": false
      },
      "setting1": {
        "status": "unchanged",
        "content": "Value 1"
      },
      "setting2": {
        "status": "deleted",
        "content": 200
      },
      "setting3": {
        "status": "changed",
        "from": true,
        "to": null
      },
      "setting4": {
        "status": "added",
        "content": "blah blah"
      },
      "setting5": {
        "status": "added",
        "content": {
          "key5": "value5"
        }
      },
      "setting6": {
        "status": "unchanged",
        "children": {
          "doge": {
            "status": "unchanged",
            "children": {
              "wow": {
                "status": "changed",
                "from": "",
                "to": "so much"
              }
            }
          },
          "key": {
            "status": "unchanged",
            "content": "value"
          },
          "ops": {
            "status": "added",
            "content": "vops"
          }
        }
      }
    }
  },
  "group1": {
    "status": "unchanged",
    "children": {
      "baz": {
        "status": "changed",
        "from": "bas",
        "to": "bars"
      },
      "foo": {
        "status": "unchanged",
        "content": "bar"
      },
      "nest": {
        "status": "changed",
        "from": {
          "key": "value"
        },
        "to": "str"
      }
    }
  },
  "group2": {
    "status": "deleted",
    "content": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  "group3": {
    "status": "added",
    "content": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
}
```