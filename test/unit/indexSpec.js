const index = require('../../index');

describe('index', () => {
    it('handles issue labels events', () => {
        const robot = { on: jest.fn() };
        index(robot);

        expect(robot.on).toHaveBeenCalledTimes(1);
        const firstArgument = robot.on.mock.calls[0][0];
        expect(firstArgument).toEqual('issues.label');
    });
});
