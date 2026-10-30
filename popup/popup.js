const STORAGE_KEY = "independentScrollEnabled";
const toggle = document.querySelector("#enabled");
const status = document.querySelector("#status");

chrome.storage.sync.get({ [STORAGE_KEY]: true }, (settings) => {
  if (chrome.runtime.lastError) {
    status.textContent = "Could not load the saved setting.";
    return;
  }
  toggle.checked = Boolean(settings[STORAGE_KEY]);
  status.textContent = toggle.checked ? "On" : "Off";
});

toggle.addEventListener("change", () => {
  const value = toggle.checked;
  chrome.storage.sync.set({ [STORAGE_KEY]: value }, () => {
    if (chrome.runtime.lastError) {
      status.textContent = "Could not save the setting.";
      return;
    }
    status.textContent = value ? "On" : "Off";
  });
});
