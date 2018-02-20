const issueLabelsHandler = require('../../../src/issueLabelsHandler');

describe('issueLabelsHandler', () => {
    it('adds calculated priority label when its missing and all metrics specified', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'Effort: 0.1' },
                { id: 123123123, name: 'Potential: 0.2' },
                { id: 123456789, name: 'Weight: 0.3' }
            ]
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn().mockReturnValue('foo-bar');
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(addLabelStub).toHaveBeenCalledTimes(1);
        expect(addLabelStub).toHaveBeenCalledWith(context, 'foo-bar');
    });
});
