const hideVideos = () => {
    const body = document.body;
    const videoContainers = [
        ...body.getElementsByTagName('ytd-rich-item-renderer'),
        ...body.getElementsByTagName('ytd-compact-video-renderer')
    ];
    videoContainers.forEach(videoContainer => {
        const infoContainers = videoContainer.getElementsByClassName('ytd-video-meta-block');
        const viewCountContainer = [...infoContainers].find(container => container.innerText.includes('views'));
        if (viewCountContainer === undefined) {
            return;
        }

        const viewCount = getViewCount(viewCountContainer.innerText);
        if (viewCount === undefined) {
            return;
        }

        if (viewCount < 100000) {
            videoContainer.style.opacity = '20%';
        }
    });
};

const getViewCount = (text) => {
    let views, factor;
    [, views, factor] = text.match(/(\d+)([K|M|B]?) views/) || [];
    if (views === undefined) {
        return;
    }
    views = parseInt(views);
    factor = {
        'K': 1000,
        'M': 1000000,
        'B': 1000000000
    }[factor] || 1;
    return views * factor;
};

const main = () => {
    setInterval(() => {
        const isYoutubePage = /youtube.com\/(watch)?/.test(window.location.href);
        if (isYoutubePage) {
            hideVideos();
        }
    }, 2000);
};

main();