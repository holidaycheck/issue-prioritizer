import test from 'ava';
import sinon from 'sinon';
import addLabel from '../../../src/addLabel';

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

test('calls addLabel with correct issue object', t => {
    const addLabelsStub = sinon.stub();
    const context = createContext(addLabelsStub);
    addLabel(context, labelName);

    t.is(addLabelsStub.callCount, 1);
    t.true(addLabelsStub.calledWith({
        number: issueNumber,
        labels: [labelName],
        owner,
        repo
    }));
});
