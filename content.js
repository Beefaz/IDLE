let clickingInterval;
let multiplierValue;
let hasClickedOnce = false;
let bossClickingInterval;
let eventClickingInterval;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'setMultiplier') {
      multiplierValue = request.multiplier;
      performFirstClick();
    } else if (request.action === 'startBossClicking') {
      startBossClicking();
    } else if (request.action === 'startEventClicker') {
      startEventClicking();
    }
  }
);

function performFirstClick() {
  const elements = document.getElementsByClassName("action-timer");
  if (elements.length > 0) {
    elements[0].click();
    hasClickedOnce = true;
    startRandomizedClicking();
  }
}

function startRandomizedClicking() {
  if (!multiplierValue) return;
  const minDelayMilliseconds = multiplierValue * 3 * 1000;
  const maxDelayMilliseconds = multiplierValue * 6 * 1000;
  if (clickingInterval) clearTimeout(clickingInterval);

  function clickAndSchedule() {
    const elements = document.getElementsByClassName("action-timer");
    if (elements.length > 0) elements[0].click();
    const randomDelay = Math.random() * (maxDelayMilliseconds - minDelayMilliseconds) + minDelayMilliseconds;
    clickingInterval = setTimeout(clickAndSchedule, randomDelay);
  }
  clickAndSchedule();
}

function startBossClicking() {
  if (bossClickingInterval) clearInterval(bossClickingInterval);

  function checkAndClickBoss() {
    const bossElements = document.getElementsByClassName("clickable boss");
    if (bossElements.length > 0) {
      bossElements[0].click();
      clearInterval(bossClickingInterval);
      setTimeout(startBossClicking, 120000);
    }
  }
  bossClickingInterval = setInterval(checkAndClickBoss, 1000);
}

function startEventClicking() {
  if (eventClickingInterval) clearTimeout(eventClickingInterval);

  function clickEventLink() {
    const container = document.getElementsByClassName("game-grid");
    if (container.length > 2) {
      const eventTextElements = container[2].getElementsByClassName("event-text");
      if (eventTextElements.length > 0 && eventTextElements[0].parentNode) {
        const linkElement = eventTextElements[0].parentNode.getElementsByTagName("a")[0];
        if (linkElement) {
          linkElement.click();
          clearInterval(eventClickingInterval);
          setTimeout(startEventClicking, 600000);
        }
      }
    }
  }
  clickEventLink();
}
