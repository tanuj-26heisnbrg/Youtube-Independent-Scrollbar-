(() => {
  const ENABLED_CLASS = "yt-independent-scroll-enabled";
  const STORAGE_KEY = "independentScrollEnabled";
  let enabled = true;
  let currentVideoId = getVideoId();

  function isWatchPage() {
    return location.pathname === "/watch";
  }

  function getVideoId() {
    return new URLSearchParams(location.search).get("v");
  }

  function resetScrollForNewVideo() {
    const nextVideoId = getVideoId();
    const changedVideo = nextVideoId && nextVideoId !== currentVideoId;
    currentVideoId = nextVideoId;
    apply();

    if (!changedVideo) return;

    // Wait for YouTube to swap in the new watch-page content before resetting
    // either its independent recommendation scroller or the one-column page.
    requestAnimationFrame(() => {
      document.querySelectorAll("ytd-watch-flexy #secondary, ytd-watch-flexy #related")
        .forEach((element) => { element.scrollTop = 0; });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }

  function apply() {
    document.documentElement.classList.toggle(ENABLED_CLASS, enabled && isWatchPage());
  }

  function setEnabled(value) {
    enabled = Boolean(value);
    apply();
  }

  chrome.storage.sync.get({ [STORAGE_KEY]: true }, (settings) => {
    if (chrome.runtime.lastError) return;
    setEnabled(settings[STORAGE_KEY]);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes[STORAGE_KEY]) {
      setEnabled(changes[STORAGE_KEY].newValue);
    }
  });

  // YouTube changes routes without reloading the content script.
  window.addEventListener("yt-navigate-finish", resetScrollForNewVideo);
  window.addEventListener("popstate", resetScrollForNewVideo);
  apply();
})();
