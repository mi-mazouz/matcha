module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
    'cypress/globals': true
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'cypress'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-tag-spacing': 'error',
    'react/require-default-props': 'error',
    'react/prop-types': 'error',
    'react/jsx-no-undef': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': 'error',
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
    indent: ['error', 2, { SwitchCase: 1, MemberExpression: 0 }],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
