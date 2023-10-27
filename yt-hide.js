const languages = {
    en: {
        re: /^(\d+(?:\.\d+)?)([K|M|B]?) views?$/,
        factor: {
            K: 1000,
            M: 1000000,
            B: 1000000000,
        },
    },
};

const getViewsCount = (text, languageConfig) => {
    let viewsStr, factorStr;
    [, viewsStr, factorStr] = text.match(languageConfig.re) || [];
    if (viewsStr === undefined || factorStr === undefined) {
        return;
    }
    const views = parseFloat(viewsStr);
    const factor = languageConfig.factor[factorStr] || 1;
    return views * factor;
};

const hideVideos = (viewsThreshold, languageConfig) => {
    [
        ...document.body.getElementsByTagName('ytd-rich-item-renderer'),
        ...document.body.getElementsByTagName('ytd-compact-video-renderer'),
    ].forEach((videoElement) => {
        const viewsCountElement = [
            ...videoElement.getElementsByClassName('inline-metadata-item style-scope ytd-video-meta-block'),
        ].find((element) => languageConfig.re.test(element.innerText));
        if (viewsCountElement === undefined) {
            return;
        }
        const viewsCount = getViewsCount(viewsCountElement.innerText, languageConfig);
        videoElement.style.opacity = viewsCount < viewsThreshold ? '20%' : '100%';
    });
};

(() => {
    const viewsThreshold = 1000;
    setInterval(() => {
        hideVideos(viewsThreshold, languages.en);
    }, 1000);
})();

if (typeof window === 'undefined') {
    module.exports = { languages, getViewsCount };
}
