const R = require('ramda');

const hasMetric = metric =>
    R.any(R.propSatisfies(
        R.contains(`${metric}: `),
        'name'
    ));

const hasAllMetrics = R.allPass([
    hasMetric('Potential'),
    hasMetric('Effort'),
    hasMetric('Weight')
]);

module.exports = (context, addLabel, calculatePriority) => {
    const addLabelWithPriority = R.compose(
        addLabel.bind(null, context),
        calculatePriority.bind(null, context)
    );

    R.when(
        hasAllMetrics,
        addLabelWithPriority
    )(context.labels);
};
