/**
 * vscode eslint
 * 1. npm i -D eslint-plugin-html
 * 2. .eslintrc | .eslint.js: "plugins": ["vue"]
 * 3. vscode plugin: eslint vetur
 * 4. setting.json
 *      "eslint.autoFixOnSave": true,
        "eslint.validate": [
            "javascript",{
                "language": "vue",
                "autoFix": true
            },"html",
            "vue"
        ]
 */

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}