const { languageConfig, getViewsCount } = require('./low-go');

const testGetViewsCount = () => {
    [
        ['5 views', 5],
        ['5.3K views', 5300],
        ['55K views', 55000],
        ['3.2M views', 3200000],
        ['1.2B views', 1200000000],
    ].forEach(([inputText, expectedViewsCount]) => {
        const actualViewsCount = getViewsCount(inputText, languageConfig.en);
        console.assert(
            actualViewsCount === expectedViewsCount,
            `getViewsCount failed for ${inputText}; expected ${expectedViewsCount}, actual ${actualViewsCount}`
        );
    });
};

testGetViewsCount();
