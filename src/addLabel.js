const R = require('ramda');

const prepareLabel = (labelText, number) => ({
    number,
    labels: [labelText]
});

module.exports = (context, labelText) => {
    const {
        issue: { number: issueNumber },
        repo: createLabelObject,
        github: { issues: { addLabels: addLabel } }
    } = context;

    R.compose(
        addLabel,
        createLabelObject,
        prepareLabel
    )(labelText, issueNumber);
};
