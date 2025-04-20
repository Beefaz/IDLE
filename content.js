let clickingInterval;
let multiplierValue;
let hasClickedOnce = false;
let bossInterval;
let eventInterval;

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

function startBossClicking() {
  if (bossInterval) clearInterval(bossInterval);

  const checkInterval = Math.floor(Math.random() * 201) + 900; // Random interval between 900 and 1000 ms

  bossInterval = setInterval(() => {
    const bossElement = document.getElementsByClassName("clickable boss")[0] ?? undefined;
    if (bossElement) {
      bossElement.click();
      clearInterval(bossInterval);
      setTimeout(startBossClicking, 120000);
    }
  }, checkInterval); // Check every second
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
