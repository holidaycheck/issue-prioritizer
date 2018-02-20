const index = require('../../index');

describe('index', () => {
    it('handles issue labels events', () => {
        const expectedEvents = ['issues.labeled', 'issues.unlabeled', 'issues.opened'];
        const robot = { on: jest.fn() };
        index(robot);

        expect(robot.on).toHaveBeenCalledTimes(1);
        const firstArgument = robot.on.mock.calls[0][0];
        expect(firstArgument).toEqual(expectedEvents);
    });
});
