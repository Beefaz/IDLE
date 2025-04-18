chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'startClicking') {
    const multiplier = request.multiplier;
    try {
      const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTabs && activeTabs.length > 0) {
        const activeTabId = activeTabs[0].id;
        await chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ['content.js']
        });
        chrome.tabs.sendMessage(activeTabId, { action: 'setMultiplier', multiplier: multiplier });
      }
    } catch (error) {}
  } else if (request.action === 'startBossClicker') {
    try {
      const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTabs && activeTabs.length > 0) {
        const activeTabId = activeTabs[0].id;
        await chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ['content.js']
        }, () => {
          chrome.tabs.sendMessage(activeTabId, { action: 'startBossClicking' });
        });
      }
    } catch (error) {}
  } else if (request.action === 'startEventClicker') {
    try {
      const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTabs && activeTabs.length > 0) {
        const activeTabId = activeTabs[0].id;
        await chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ['content.js']
        }, () => {
          chrome.tabs.sendMessage(activeTabId, { action: 'startEventClicker' });
        });
      }
    } catch (error) {}
  }
});
