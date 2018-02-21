const addLabel = require('../../../src/addLabel');

describe('addLabel', () => {
    const issueNumber = 123;
    const owner = 'foo bar owner';
    const repo = 'foobaria repo';
    const labelName = 'some labelzzz';

    const createContext = (addLabels) => {
        const issue = { number: issueNumber };
        const repository = {
            name: repo,
            owner: { login: owner }
        };

        return {
            payload: { issue, repository },
            github: { issues: { addLabels } }
        };
    };

    it('calls addLabel with correct issue object', () => {
        const addLabelsStub = jest.fn();
        const context = createContext(addLabelsStub);
        addLabel(context, labelName);

        expect(addLabelsStub).toHaveBeenCalledTimes(1);
        expect(addLabelsStub).toHaveBeenCalledWith({
            number: issueNumber,
            labels: [labelName],
            owner,
            repo
        });
    });
});
