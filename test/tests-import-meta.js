// Tests for ECMAScript 2020 `import.meta`

if (typeof exports != 'undefined') {
  var test = require('./driver.js').test;
  var testFail = require('./driver.js').testFail;
}

test(
  "import.meta",
  {
    "type": "Program",
    "start": 0,
    "end": 11,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 11,
        "expression": {
          "type": "MetaProperty",
          "start": 0,
          "end": 11,
          "meta": {
            "type": "Identifier",
            "start": 0,
            "end": 6,
            "name": "import"
          },
          "property": {
            "type": "Identifier",
            "start": 7,
            "end": 11,
            "name": "meta"
          }
        }
      }
    ],
    "sourceType": "module"
  },
  { ecmaVersion: 11, sourceType: "module" }
);

test(
  "import.meta",
  {
    "type": "Program",
    "start": 0,
    "end": 11,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 11,
        "expression": {
          "type": "MetaProperty",
          "start": 0,
          "end": 11,
          "meta": {
            "type": "Identifier",
            "start": 0,
            "end": 6,
            "name": "import"
          },
          "property": {
            "type": "Identifier",
            "start": 7,
            "end": 11,
            "name": "meta"
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 11, sourceType: "script", allowImportExportEverywhere: true }
);

test(
  "import.meta.url",
  {
    "type": "Program",
    "start": 0,
    "end": 15,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 15,
        "expression": {
          "type": "MemberExpression",
          "start": 0,
          "end": 15,
          "object": {
            "type": "MetaProperty",
            "start": 0,
            "end": 11,
            "meta": {
              "type": "Identifier",
              "start": 0,
              "end": 6,
              "name": "import"
            },
            "property": {
              "type": "Identifier",
              "start": 7,
              "end": 11,
              "name": "meta"
            }
          },
          "property": {
            "type": "Identifier",
            "start": 12,
            "end": 15,
            "name": "url"
          },
          "computed": false
        }
      }
    ],
    "sourceType": "module"
  },
  { ecmaVersion: 11, sourceType: "module" }
);

testFail("import.meta", "Cannot use 'import.meta' outside a module (1:0)", { ecmaVersion: 11, sourceType: "script" });
testFail("import['meta']", "Unexpected token (1:6)", { ecmaVersion: 11, sourceType: "module" });
testFail("a = import['meta']", "Unexpected token (1:10)", { ecmaVersion: 11, sourceType: "module" });
testFail("import.target", "The only valid meta property for import is 'import.meta' (1:7)", { ecmaVersion: 11, sourceType: "module" });
testFail("new.meta", "The only valid meta property for new is 'new.target' (1:4)", { ecmaVersion: 11, sourceType: "module" });
testFail("im\\u0070ort.meta", "Escape sequence in keyword import (1:0)", { ecmaVersion: 11, sourceType: "module" });
testFail("import.\\u006d\\u0065\\u0074\\u0061", "'import.meta' must not contain escaped characters (1:0)", { ecmaVersion: 11, sourceType: "module" });
