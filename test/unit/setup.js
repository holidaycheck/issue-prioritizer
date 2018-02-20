process.once('unhandledRejection', (error) => {
    throw new Error(`Unhandled rejection: ${error.stack}`);
});
