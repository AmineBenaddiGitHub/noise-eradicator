// /!\ this should be copied in content.js file

// YouYube Elements
const ytElements = [
  // main feed
  "ytd-rich-grid-renderer #contents",
  // notifications badge
  ".yt-spec-icon-badge-shape__badge",
  // content proposition next to videos
  "#columns #secondary",
  // shorts on desktop
  "#items > ytd-guide-entry-renderer:nth-child(2)",
  // shorts on small devices
  "#items > ytd-mini-guide-entry-renderer:nth-child(2)"
];

// LinkedIn Elements
const lkElements = [
  // main feed
  ".scaffold-finite-scroll",
  // notifications badge
  ".notification-badge"
];

// Twitter Elements
const twElements = [
  // main feed
  'section[aria-labelledby^="accessible-list"]',
  // notifications badge
  'header nav > a:nth-child(4) div[aria-live="polite"]'
];

const button = document.createElement("button");
button.innerHTML = "Display All";
button.style.cssText = `
  border-radius: 1rem;
  max-height: 4rem;
  align-self: center;
  cursor: pointer;
`;

const observer = hideAllDisturbingThings()

button.onclick = () => {
  observer.disconnect();
  switch (window.location.hostname) {
    case "www.linkedin.com":
      elementsDisplayer(lkElements);
      break;

    case "www.youtube.com":
      elementsDisplayer(ytElements);
      break;

    case "twitter.com":
      elementsDisplayer(twElements);
      break;

    default:
      break;
  }
};

setTimeout(() => {
  switch (window.location.hostname) {
    case "www.linkedin.com":
      document.querySelector('#global-nav > div > a > div > div').appendChild(button);
      break;

    case "www.youtube.com":
      document.querySelector('#logo').appendChild(button);
      break;

    case "twitter.com":
      document.querySelector('header > div > div > div > div:nth-child(1) > div').appendChild(button);
      break;

    default:
      break;
  }
}, 1000);

function hideAllDisturbingThings() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      switch (window.location.hostname) {
        case "www.linkedin.com":
          elementsHider(lkElements, mutation);
          break;

        case "www.youtube.com":
          elementsHider(ytElements, mutation);
          break;

        case "twitter.com":
          elementsHider(twElements, mutation);
          break;

        default:
          break;
      }
    });
  });
  observer.observe(document.body, { subtree: true, childList: true });   
  return observer;   
}

function elementsHider(array, mutation) {
  array.forEach(e => {
    if (mutation.target.querySelector(e)) {
      mutation.target.querySelector(e).style = "display: none !important;";
    }
  })
}

function elementsDisplayer(array) {
  array.forEach(e => {
    if (document.querySelector(e)) {
      document.querySelector(e).style = "";
    }
  })
}


