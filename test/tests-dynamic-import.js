// Tests for ECMAScript 2020 dynamic import

if (typeof exports != 'undefined') {
  var test = require('./driver.js').test;
  var testFail = require('./driver.js').testFail;
}

test(
  "import('dynamicImport.js')",
  {
    type: 'Program',
    start: 0,
    end: 26,
    body: [
      {
        type: 'ExpressionStatement',
        start: 0,
        end: 26,
        expression: {
          type: 'ImportExpression',
          start: 0,
          end: 26,
          source: {
            type: 'Literal',
            start: 7,
            end: 25,
            value: 'dynamicImport.js',
            raw: "'dynamicImport.js'"
          }
        }
      }
    ],
    sourceType: 'script'
  },
  { ecmaVersion: 11 }
);

test(
  "import('dynamicImport.js')",
  {
    type: 'Program',
    start: 0,
    end: 26,
    body: [
      {
        type: 'ExpressionStatement',
        start: 0,
        end: 26,
        expression: {
          type: 'ImportExpression',
          start: 0,
          end: 26,
          source: {
            type: 'Literal',
            start: 7,
            end: 25,
            value: 'dynamicImport.js',
            raw: "'dynamicImport.js'"
          }
        }
      }
    ],
  },
  { ecmaVersion: 5,  sourceType: 'module' }
);

// Assignment is OK.
test(
  "import(a = 'dynamicImport.js')",
  {
    "type": "Program",
    "start": 0,
    "end": 30,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 30,
        "expression": {
          "type": "ImportExpression",
          "start": 0,
          "end": 30,
          "source": {
            "type": "AssignmentExpression",
            "start": 7,
            "end": 29,
            "operator": "=",
            "left": {
              "type": "Identifier",
              "start": 7,
              "end": 8,
              "name": "a"
            },
            "right": {
              "type": "Literal",
              "start": 11,
              "end": 29,
              "value": "dynamicImport.js",
              "raw": "'dynamicImport.js'"
            }
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 11 }
);

test(
  "function* a() { yield import('http'); }",
  {
    type: 'Program',
    start: 0,
    end: 39,
    body: [
      {
        type: 'FunctionDeclaration',
        start: 0,
        end: 39,
        id: { type: 'Identifier', start: 10, end: 11, name: 'a' },
        expression: false,
        generator: true,
        async: false,
        params: [],
        body: {
          type: 'BlockStatement',
          start: 14,
          end: 39,
          body: [
            {
              type: 'ExpressionStatement',
              start: 16,
              end: 37,
              expression: {
                type: 'YieldExpression',
                start: 16,
                end: 36,
                delegate: false,
                argument: {
                  type: 'ImportExpression',
                  start: 22,
                  end: 36,
                  source: { type: 'Literal', start: 29, end: 35, value: 'http', raw: "'http'" }
                }
              }
            }
          ]
        }
      }
    ],
    sourceType: 'script'
  },
  { ecmaVersion: 11 }
);

// `new import(s)` is syntax error, but `new (import(s))` is not.
test(
  "new (import(s))",
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
          "type": "NewExpression",
          "start": 0,
          "end": 15,
          "callee": {
            "type": "ImportExpression",
            "start": 5,
            "end": 14,
            "source": {
              "type": "Identifier",
              "start": 12,
              "end": 13,
              "name": "s"
            }
          },
          "arguments": []
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 11 }
);

// `import(s,t)` is syntax error, but `import((s,t))` is not.
test(
  "import((s,t))",
  {
    "type": "Program",
    "start": 0,
    "end": 13,
    "body": [
      {
        "type": "ExpressionStatement",
        "start": 0,
        "end": 13,
        "expression": {
          "type": "ImportExpression",
          "start": 0,
          "end": 13,
          "source": {
            "type": "SequenceExpression",
            "start": 8,
            "end": 11,
            "expressions": [
              {
                "type": "Identifier",
                "start": 8,
                "end": 9,
                "name": "s"
              },
              {
                "type": "Identifier",
                "start": 10,
                "end": 11,
                "name": "t"
              }
            ]
          }
        }
      }
    ],
    "sourceType": "script"
  },
  { ecmaVersion: 11 }
);

testFail('function failsParse() { return import.then(); }', 'The only valid meta property for import is \'import.meta\' (1:38)', {
  ecmaVersion: 11,
  loose: false
});

testFail("var dynImport = import; dynImport('http');", 'Unexpected token (1:22)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import()", 'Unexpected token (1:7)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(a, b)", 'Unexpected token (1:8)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(...[a])", 'Unexpected token (1:7)', {
  ecmaVersion: 11,
  loose: false
});

testFail("import(source,)", 'Trailing comma is not allowed in import() (1:13)', {
  ecmaVersion: 11,
  loose: false
});

testFail("new import(source)", 'Cannot use new with import() (1:4)', {
  ecmaVersion: 11,
  loose: false
});

testFail("(import)(s)", 'Unexpected token (1:7)', {
  ecmaVersion: 11,
  loose: false
});
