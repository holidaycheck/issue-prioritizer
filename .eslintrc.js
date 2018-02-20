module.exports = {
  "extends": [ "airbnb-base", "plugin:ramda/recommended" ],
  "rules": {
    "comma-dangle": 0,
    "indent": ["error", 4]
  },
  "plugins": [
    "ramda"
  ],
  "globals": {
    "it": true,
    "describe": true,
    "jest": true,
    "expect": true,
    "afterEach": true
  }
};