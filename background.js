//background.js
chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === 'startClicking') {
    const multiplier = request.multiplier;
    try {
      const activeTabs = await chrome.tabs.query({active: true, currentWindow: true});
      if (activeTabs && activeTabs.length > 0) {
        chrome.tabs.sendMessage(activeTabs[0].id, {action: 'setMultiplier', multiplier: multiplier});
      }
    } catch (error) {
    }
  } else if (request.action === 'startBossClicker') {
    try {
      const activeTabs = await chrome.tabs.query({active: true, currentWindow: true});
      if (activeTabs && activeTabs.length > 0) {
        chrome.tabs.sendMessage(activeTabs[0].id, {action: 'startBossClicker'});
      }
    } catch (error) {
    }
  } else if (request.action === 'startEventClicker') {
    try {
      const activeTabs = await chrome.tabs.query({active: true, currentWindow: true});
      if (activeTabs && activeTabs.length > 0) {
        chrome.tabs.sendMessage(activeTabs[0].id, {action: 'startEventClicker'});
      }
    } catch (error) {
    }
  }
});
