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

const priorityLabelIsNotSet = R.complement(hasMetric('Priority'));

const shouldAddPriorityLabel = R.allPass([hasAllMetrics, priorityLabelIsNotSet]);

module.exports = (context, addLabel, calculatePriority) => {
    const addPriorityLabel = R.compose(
        addLabel.bind(null, context),
        calculatePriority.bind(null, context)
    );

    R.when(
        shouldAddPriorityLabel,
        addPriorityLabel
    )(context.labels);
};
