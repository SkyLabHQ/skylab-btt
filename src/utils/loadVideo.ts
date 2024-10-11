const videoCache: any = {};

// 加载视频数据并缓存
const loadVideo = async (url: string) => {
    if (videoCache[url]) {
        return videoCache[url];
    } else {
        const response = await fetch(url);
        const blob = await response.blob();
        const videoURL = URL.createObjectURL(blob);
        videoCache[url] = videoURL;
        return videoURL;
    }
};

export default loadVideo;
