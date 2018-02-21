const issueLabelsHandler = require('../../../src/issueLabelsHandler');

const expectDoNotCalculateOrAddPriorityLabel = (labels) => {
    const context = { labels };
    const addLabelStub = jest.fn();
    const calculatePriorityStub = jest.fn();
    issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

    expect(calculatePriorityStub).toHaveBeenCalledTimes(0);
    expect(addLabelStub).toHaveBeenCalledTimes(0);
};

describe('issueLabelsHandler', () => {
    it('calculates priority label when all metrics specified', () => {
        const context = {
            labels: [
                { id: 208045946, name: 'Effort: 0.3' },
                { id: 123123123, name: 'Potential: 0.3' },
                { id: 123456789, name: 'Weight: 0.5' },
                { id: 123456789, name: 'Foobaria: zzz' }
            ]
        };
        const expectedLabelsForCalculation = {
            effort: 0.3,
            potential: 0.3,
            weight: 0.5
        };
        const addLabelStub = jest.fn();
        const calculatePriorityStub = jest.fn().mockReturnValue('1.0');
        issueLabelsHandler(context, addLabelStub, calculatePriorityStub);

        expect(calculatePriorityStub).toHaveBeenCalledTimes(1);
        expect(calculatePriorityStub).toHaveBeenCalledWith(expectedLabelsForCalculation);
    });

    it('adds calculated priority label when all metrics specified', () => {
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
        expect(addLabelStub).toHaveBeenCalledWith(context, 'Priority: foo-bar');
    });

    it('WILL NOT add priority label when potential label is missing', () => {
        const labels = [
            { id: 208045946, name: 'Effort: 0.1' },
            { id: 123123123, name: 'xxxxxxx: 0.2' },
            { id: 123456789, name: 'Weight: 0.3' }
        ];

        expectDoNotCalculateOrAddPriorityLabel(labels);
    });

    it('WILL NOT add priority label when weight label is missing', () => {
        const labels = [
            { id: 208045946, name: 'Effort: 0.1' },
            { id: 123123123, name: 'Potential: 0.2' }
        ];

        expectDoNotCalculateOrAddPriorityLabel(labels);
    });

    it('WILL NOT add priority label when effort label is missing', () => {
        const labels = [
            { id: 208045946, name: 'Weight: 0.1' },
            { id: 123123123, name: 'Potential: 0.2' }
        ];

        expectDoNotCalculateOrAddPriorityLabel(labels);
    });

    it('WILL NOT add priority label when all metric labels are missing', () => {
        const labels = [
            { id: 208045946, name: 'zzz: 0.1' },
            { id: 123123123, name: 'foo: 0.2' }
        ];

        expectDoNotCalculateOrAddPriorityLabel(labels);
    });

    it('WILL NOT add priority label when it has been already set', () => {
        const labels = [
            { id: 208045946, name: 'Effort: 0.1' },
            { id: 123123123, name: 'Potential: 0.2' },
            { id: 123456789, name: 'Weight: 0.3' },
            { id: 123456789, name: 'Priority: 0.5' }
        ];

        expectDoNotCalculateOrAddPriorityLabel(labels);
    });
});
