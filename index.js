const issueLabelsHandler = require('./src/issueLabelsHandler');

const addLabel = () => {};
const calculatePriority = () => {};

module.exports = robot => robot.on('issues.label', issueLabelsHandler.bind(null, addLabel, calculatePriority));
