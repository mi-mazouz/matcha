module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'comma-dangle': ['error', 'never'],
    indent: ['error', 2, { MemberExpression: 0, SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
