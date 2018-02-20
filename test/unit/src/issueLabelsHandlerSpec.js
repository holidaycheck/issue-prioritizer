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

    it('WILL NOT add priority label when potential label is missing', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'Effort: 0.1' },
                { id: 123123123, name: 'xxxxxxx: 0.2' },
                { id: 123456789, name: 'Weight: 0.3' }
            ]
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn();
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(calculatePriorityStub).toHaveBeenCalledTimes(0);
        expect(addLabelStub).toHaveBeenCalledTimes(0);
    });

    it('WILL NOT add priority label when weight label is missing', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'Effort: 0.1' },
                { id: 123123123, name: 'Potential: 0.2' }
            ]
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn();
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(calculatePriorityStub).toHaveBeenCalledTimes(0);
        expect(addLabelStub).toHaveBeenCalledTimes(0);
    });

    it('WILL NOT add priority label when effort label is missing', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'Weight: 0.1' },
                { id: 123123123, name: 'Potential: 0.2' }
            ]
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn();
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(calculatePriorityStub).toHaveBeenCalledTimes(0);
        expect(addLabelStub).toHaveBeenCalledTimes(0);
    });

    it('WILL NOT add priority label when all metric labels are missing', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'zzz: 0.1' },
                { id: 123123123, name: 'foo: 0.2' }
            ]
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn();
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(calculatePriorityStub).toHaveBeenCalledTimes(0);
        expect(addLabelStub).toHaveBeenCalledTimes(0);
    });
});
