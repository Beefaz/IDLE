let clickingInterval;
let multiplierValue;
let hasClickedOnce = false;
let bossClickingInterval;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'setMultiplier') {
      multiplierValue = request.multiplier;
      performFirstClick();
    } else if (request.action === 'startBossClicking') {
      startBossClicking();
    }
  }
);

function performFirstClick() {
  const elements = document.getElementsByClassName("action-timer");
  if (elements.length > 0) {
    elements[0].click();
    hasClickedOnce = true;
    startRandomizedClicking();
  } else {
    console.log("No element with class 'action-timer' found for the first click.");
  }
}

function startRandomizedClicking() {
  if (!multiplierValue) {
    console.log("Multiplier not yet received for randomized clicking.");
    return;
  }

  const minDelayMilliseconds = multiplierValue * 3 * 1000;
  const maxDelayMilliseconds = multiplierValue * 6 * 1000;

  if (clickingInterval) {
    clearTimeout(clickingInterval);
    clickingInterval = null;
  }

  function clickAndSchedule() {
    const elements = document.getElementsByClassName("action-timer");
    if (elements.length > 0) {
      elements[0].click();
    } else {
      console.log("No element with class 'action-timer' found for subsequent clicks.");
    }

    const randomDelay = Math.random() * (maxDelayMilliseconds - minDelayMilliseconds) + minDelayMilliseconds;
    clickingInterval = setTimeout(clickAndSchedule, randomDelay);
  }

  // Start the randomized clicking loop
  clickAndSchedule();
}

function startBossClicking() {
  if (bossClickingInterval) {
    clearInterval(bossClickingInterval);
  }

  function checkAndClickBoss() {
    const bossElements = document.getElementsByClassName("clickable boss");
    if (bossElements.length > 0) {
      bossElements[0].click();
      console.log("Clicked 'clickable boss'. Waiting for 2 minutes before checking again.");
      clearInterval(bossClickingInterval); // Stop the 1-second checking

      // Reinitialize the checking after 2 minutes (120,000 milliseconds)
      setTimeout(startBossClicking, 120000);
    } else {
      // Keep checking every second if the boss element is not found
      console.log("Checking for 'clickable boss'...");
    }
  }

  // Start checking for the boss every second
  bossClickingInterval = setInterval(checkAndClickBoss, 1000);
}
