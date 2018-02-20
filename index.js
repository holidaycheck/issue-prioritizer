const issueLabelsHandler = require('./src/issueLabelsHandler');

module.exports = robot => robot.on('issues.label', issueLabelsHandler);
