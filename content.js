let clickingInterval;
let multiplierValue;
let hasClickedOnce = false;
let eventInterval;

let bossInterval = null;
let currentBosses = [];

chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.action === 'setMultiplier') {
      multiplierValue = request.multiplier;
      performFirstClick();
    } else if (request.action === 'startBossClicker') {
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

function handleBosses() {
  const latestBossElements = Array.from(document.getElementsByClassName("clickable boss"));
  const currentBossCount = latestBossElements.length;

  if (currentBossCount > 0) {
    if (currentBossCount !== currentBosses.length) {
      currentBosses = latestBossElements;
      const firstBoss = currentBosses[0];
      firstBoss.click();
    }
    setTimeout(handleBosses, 100);
  } else {
    const checkInterval = Math.floor(Math.random() * 201) + 900;
    bossInterval = setTimeout(startBossClicking, checkInterval);
    currentBosses = [];
  }
}

function startBossClicking() {
  if (bossInterval) clearTimeout(bossInterval);
  handleBosses();
}


function startEventClicking() {
  if (eventInterval) clearInterval(eventInterval);

  const checkInterval = Math.floor(Math.random() * 201) + 900;

  eventInterval = setInterval(()=>{
    const container = document.getElementsByClassName("game-grid");
    const eventElement = container[container.length - 1].getElementsByClassName("event-text")[0] ?? undefined;
    if (eventElement) {
      const neighbourElement = eventElement.parentNode;
      const targetLinkElement = neighbourElement.getElementsByTagName("a")[0]
      targetLinkElement.click();
      clearInterval(eventInterval);
      setTimeout(startEventClicking, 670000);
    }
  }, checkInterval);
}
