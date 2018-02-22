import test from 'ava';
import sinon from 'sinon';
import issueLabelsHandler from '../../../src/issueLabelsHandler';

const expectDoNotCalculateOrAddPriorityLabel = (t, labels) => {
    const context = {
        payload: {
            issue: { labels }
        }
    };
    const addLabelStub = sinon.stub();
    const calculatePriorityStub = sinon.stub();
    issueLabelsHandler(addLabelStub, calculatePriorityStub, context);

    t.is(calculatePriorityStub.callCount, 0);
    t.is(addLabelStub.callCount, 0);
};

test('calculates priority label when all metrics specified', t => {
    const context = {
        payload: {
            issue: {
                labels: [
                    { id: 208045946, name: 'Effort: 0.3' },
                    { id: 123123123, name: 'Potential: 0.3' },
                    { id: 123456789, name: 'Weight: 0.5' },
                    { id: 123456789, name: 'Foobaria: zzz' }
                ]
            }
        }
    };
    const expectedLabelsForCalculation = {
        effort: 0.3,
        potential: 0.3,
        weight: 0.5
    };
    const addLabelStub = sinon.stub();
    const calculatePriorityStub = sinon.stub().returns('1.0');
    issueLabelsHandler(addLabelStub, calculatePriorityStub, context);

    t.is(calculatePriorityStub.callCount, 1);
    t.true(calculatePriorityStub.calledWith(expectedLabelsForCalculation));
});

test('adds calculated priority label when all metrics specified', t => {
    const context = {
        payload: {
            issue: {
                labels: [
                    { id: 208045946, name: 'Effort: 0.1' },
                    { id: 123123123, name: 'Potential: 0.2' },
                    { id: 123456789, name: 'Weight: 0.3' }
                ]
            }
        }
    };
    const addLabelStub = sinon.stub();
    const calculatePriorityStub = sinon.stub().returns('foo-bar');
    issueLabelsHandler(addLabelStub, calculatePriorityStub, context);

    t.is(addLabelStub.callCount, 1);
    t.true(addLabelStub.calledWith(context, 'Priority: foo-bar'));
});

test('WILL NOT add priority label when potential label is missing', t => {
    const labels = [
        { id: 208045946, name: 'Effort: 0.1' },
        { id: 123123123, name: 'xxxxxxx: 0.2' },
        { id: 123456789, name: 'Weight: 0.3' }
    ];

    expectDoNotCalculateOrAddPriorityLabel(t, labels);
});

test('WILL NOT add priority label when weight label is missing', t => {
    const labels = [
        { id: 208045946, name: 'Effort: 0.1' },
        { id: 123123123, name: 'Potential: 0.2' }
    ];

    expectDoNotCalculateOrAddPriorityLabel(t, labels);
});

test('WILL NOT add priority label when effort label is missing', t => {
    const labels = [
        { id: 208045946, name: 'Weight: 0.1' },
        { id: 123123123, name: 'Potential: 0.2' }
    ];

    expectDoNotCalculateOrAddPriorityLabel(t, labels);
});

test('WILL NOT add priority label when all metric labels are missing', t => {
    const labels = [
        { id: 208045946, name: 'zzz: 0.1' },
        { id: 123123123, name: 'foo: 0.2' }
    ];

    expectDoNotCalculateOrAddPriorityLabel(t, labels);
});

test('WILL NOT add priority label when it has been already set', t => {
    const labels = [
        { id: 208045946, name: 'Effort: 0.1' },
        { id: 123123123, name: 'Potential: 0.2' },
        { id: 123456789, name: 'Weight: 0.3' },
        { id: 123456789, name: 'Priority: 0.5' }
    ];

    expectDoNotCalculateOrAddPriorityLabel(t, labels);
});
