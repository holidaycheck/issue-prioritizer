const R = require('ramda');

const round = number => number.toFixed(1);

const calculate = ({ potential, effort, weight }) =>
    // eslint-disable-next-line no-mixed-operators
    2 * potential + 1 - effort + weight;

module.exports = metrics => R.compose(round, calculate)(metrics);
