module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    indent: ['error', 2, { MemberExpression: 0, SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
