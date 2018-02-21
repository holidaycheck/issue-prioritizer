const addLabel = require('../../../src/addLabel');

describe('addLabel', () => {
    const issueNumber = 123;
    const createContext = (repo = () => {}, addLabels = () => {}) =>
        ({
            repo,
            issue: { number: issueNumber },
            github: { issues: { addLabels } }
        });

    it('builds information for adding issue', () => {
        const repoStub = jest.fn();
        const context = createContext(repoStub);
        const labelName = 'some label';
        addLabel(context, labelName);

        expect(repoStub).toHaveBeenCalledTimes(1);
        expect(repoStub).toHaveBeenCalledWith({
            number: issueNumber,
            labels: [labelName]
        });
    });

    it('passes prepared issue to add label', () => {
        const repoStub = jest.fn().mockReturnValue('foo-bar');
        const addLabelsStub = jest.fn();
        const context = createContext(repoStub, addLabelsStub);
        const labelName = 'some labelzzz';
        addLabel(context, labelName);

        expect(addLabelsStub).toHaveBeenCalledTimes(1);
        expect(addLabelsStub).toHaveBeenCalledWith('foo-bar');
    });
});
