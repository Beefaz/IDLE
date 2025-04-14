let clickingInterval;
let multiplierValue;
let hasClickedOnce = false;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === 'setMultiplier') {
      multiplierValue = request.multiplier;
      performFirstClick();
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
