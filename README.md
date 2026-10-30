# YouTube Independent Scroll

Make YouTube's recommendations sidebar scroll independently from the video and main page. Hover over recommendations and scroll to browse them while the main page stays in place. Scroll outside the sidebar to use YouTube's normal page scrolling.

This lightweight Manifest V3 browser extension uses CSS and JavaScript. It needs no backend, account, or AI service.

## Features

- Independent scrolling for the recommendations sidebar on YouTube watch pages.
- A toolbar popup with an on/off switch.
- The setting is saved and applied across YouTube's in-page navigation.
- Normal page scrolling remains available outside the recommendations sidebar.
- The effect is disabled on narrow mobile layouts and other YouTube pages.

## Install from source

1. Download or clone this repository.
2. Open your browser's extensions page:
   - Chrome: `chrome://extensions`
   - Brave: `brave://extensions`
   - Microsoft Edge: `edge://extensions`
3. Turn on **Developer mode**.
4. Choose **Load unpacked** and select the folder containing `manifest.json`.
5. Open or reload a YouTube video page.

The extension is enabled by default. Click its toolbar icon to open the popup and switch independent scrolling off or on. If the icon is hidden, use the browser's extensions menu to pin it.

## Use it

1. Open a YouTube video on a desktop-sized window.
2. Move the pointer over the recommendations on the right.
3. Scroll to browse recommendations independently.
4. Move the pointer outside the sidebar to scroll the page normally.

## Compatibility

Built for Chromium-based browsers that support Manifest V3, including Chrome, Brave, and Microsoft Edge. The current content script matches `https://www.youtube.com/*`. On narrow windows, the sidebar stays in the normal page flow.

## Project structure

```text
.
├── manifest.json
├── content/
│   ├── content.js
│   └── styles.css
└── popup/
    ├── popup.html
    ├── popup.css
    └── popup.js
```

## Privacy

The extension does not collect or transmit browsing data. It requests the `storage` permission only to remember the on/off setting. Its content script and stylesheet run on YouTube pages to apply the scrolling behavior.

## Development

Edit the files, then click **Reload** for the extension on the browser's extensions page. Reload the YouTube tab to apply changes to the content script or styles.

## License

No license has been specified yet. Add a `LICENSE` file before redistributing this project if you want to grant others clear permission to use, modify, or share it.
