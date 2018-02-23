import test from 'ava';
import calculatePriority from '../../../src/calculatePriority';

test('calculates priority based on effort, potential and weight', t => {
    const metrics = {
        effort: 0.3,
        potential: 0.9,
        weight: 0.2
    };

    t.is(calculatePriority(metrics), '2.7');
});

test('rounds calculated priority', t => {
    const metrics = {
        effort: 0.1,
        potential: 0.2,
        weight: 0.3
    };

    t.is(calculatePriority(metrics), '1.6');
});

test('calculates max priority', t => {
    const metrics = {
        effort: 0.1,
        potential: 1,
        weight: 1
    };

    t.is(calculatePriority(metrics), '3.9');
});

test('calculates min priority', t => {
    const metrics = {
        effort: 1.0,
        potential: 0.1,
        weight: 0.1
    };

    t.is(calculatePriority(metrics), '0.3');
});
