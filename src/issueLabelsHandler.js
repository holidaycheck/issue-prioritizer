module.exports = (context, addLabel, calculatePriority) => {
    addLabel(context, calculatePriority(context));
};
