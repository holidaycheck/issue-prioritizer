const issueLabelsHandler = require('./src/issueLabelsHandler');

const addLabel = () => {};
const calculatePriority = () => {};

module.exports = (robot) => {
    const events = ['issues.labeled', 'issues.unlabeled', 'issues.opened'];

    return robot.on(events, issueLabelsHandler.bind(null, addLabel, calculatePriority));
};
