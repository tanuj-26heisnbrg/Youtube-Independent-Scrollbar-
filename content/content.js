(() => {
  const ENABLED_CLASS = "yt-independent-scroll-enabled";
  const STORAGE_KEY = "independentScrollEnabled";
  let enabled = true;

  function isWatchPage() {
    return location.pathname === "/watch";
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
  window.addEventListener("yt-navigate-finish", apply);
  window.addEventListener("popstate", apply);
  apply();
})();
