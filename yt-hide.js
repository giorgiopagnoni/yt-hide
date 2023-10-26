const hideVideos = (viewsThreshold, languageConfig) => {
    const body = document.body;
    const videoContainers = [
        ...body.getElementsByTagName('ytd-rich-item-renderer'),
        ...body.getElementsByTagName('ytd-compact-video-renderer'),
    ];
    videoContainers.forEach((videoContainer) => {
        const infoContainers = videoContainer.getElementsByClassName('ytd-video-meta-block');
        const viewsCountContainer = [...infoContainers].find((container) =>
            languageConfig.re.test(container.innerText)
        );
        if (viewsCountContainer === undefined) {
            return;
        }
        const viewsCount = getViewCount(viewsCountContainer.innerText, languageConfig);
        videoContainer.style.opacity = viewsCount < viewsThreshold ? '20%' : '100%';
    });
};

const getViewCount = (text, languageConfig) => {
    let viewsStr, factorStr;
    [, viewsStr, factorStr] = text.match(languageConfig.re) || [];
    if (viewsStr === undefined || factorStr === undefined) {
        return;
    }
    const views = parseFloat(viewsStr);
    const factor = languageConfig.factor[factorStr] || 1;
    return views * factor;
};

const main = () => {
    const viewsThreshold = 500;
    const languages = {
        en: {
            re: /^(\d+(?:\.\d+)?)([K|M|B]?) views$/,
            factor: {
                K: 1000,
                M: 1000000,
                B: 1000000000,
            },
        },
    };
    setInterval(() => {
        hideVideos(viewsThreshold, languages.en);
    }, 1000);
};

main();
