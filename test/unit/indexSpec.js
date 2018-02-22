import test from 'ava';
import sinon from 'sinon';
import index from '../../index';

test('handles issue labels events', t => {
    const expectedEvents = ['issues.labeled', 'issues.unlabeled', 'issues.opened'];
    const robot = { on: sinon.spy() };
    index(robot);

    t.is(robot.on.callCount, 1);
    t.deepEqual(robot.on.firstCall.args[0], expectedEvents);
});
