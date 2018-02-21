const calculatePriority = require('../../../src/calculatePriority');

describe('calculatePriority', () => {
    it('calculate priority based on effort, potential and weight', () => {
        const metrics = {
            effort: 0.3,
            potential: 0.9,
            weight: 0.2
        };

        expect(calculatePriority(metrics)).toEqual('2.7');
    });

    it('rounds calculated priority', () => {
        const metrics = {
            effort: 0.1,
            potential: 0.2,
            weight: 0.3
        };

        expect(calculatePriority(metrics)).toEqual('1.6');
    });

    it('calculates max priority', () => {
        const metrics = {
            effort: 0.1,
            potential: 1,
            weight: 1
        };

        expect(calculatePriority(metrics)).toEqual('3.9');
    });

    it('calculates min priority', () => {
        const metrics = {
            effort: 1.0,
            potential: 0.1,
            weight: 0.1
        };

        expect(calculatePriority(metrics)).toEqual('0.3');
    });
});
