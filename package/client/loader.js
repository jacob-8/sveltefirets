const loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
});
export const loadScriptOnce = (() => {
    const loaded = [];
    return async function (url) {
        if (!loaded.includes(url)) {
            loaded.push(url);
            await loadScript(url);
            return true;
        }
        else {
            return true;
        }
    };
})();
const loadStyles = (url) => new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
});
export const loadStylesOnce = (() => {
    let loaded = [];
    return async function (url) {
        if (!loaded.includes(url)) {
            loaded = [url];
            await loadStyles(url);
            return true;
        }
        else {
            return true;
        }
    };
})();
