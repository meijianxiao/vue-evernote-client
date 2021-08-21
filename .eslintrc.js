// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'indent':'off',
    'spaced-comment':'off',
    'no-trailing-spaces':'off',
    'no-new':'off',
    'key-spacing':'off',
    'comma-dangle':'off',
    'eol-last':'off',
    'quotes':'off',
    'semi':'off',
    'keyword-spacing':'off',
    'space-before-blocks':'off',
    'comma-spacing':'off',
    'space-before-function-paren':'off',
    'space-infix-ops':'off',
    'no-multiple-empty-lines':'off',
    'block-spacing':'off',
    'padded-blocks':'off',
    'arrow-spacing':'off',
    'no-sequences':'off',
    'no-unused-expressions':'off',
    'no-multi-spaces':'off',
    'no-unused-vars':'off',
    'camelcase ':'off'
  }
}
