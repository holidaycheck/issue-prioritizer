const R = require('ramda');

const prepareLabel = (labelText, number, repo, owner) => ({
    number,
    labels: [labelText],
    repo,
    owner
});

module.exports = (context, labelText) => {
    const {
        payload: {
            issue: { number: issueNumber },
            repository: {
                owner: { login: owner },
                name: repo
            },
        },
        github: { issues: { addLabels: addLabel } }
    } = context;

    R.compose(
        addLabel,
        prepareLabel
    )(labelText, issueNumber, repo, owner);
};
