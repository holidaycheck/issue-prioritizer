const index = require('../../index');
const issueLabelsHandler = require('../../src/issueLabelsHandler');

describe('index', () => {
    it('handles issue labels events', () => {
        const robot = { on: jest.fn() };
        index(robot);

        expect(robot.on).toHaveBeenCalledTimes(1);
        expect(robot.on).toHaveBeenCalledWith('issues.label', issueLabelsHandler);
    });
});
