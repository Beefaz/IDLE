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

        // Send the multiplier to the content script
        chrome.tabs.sendMessage(activeTabId, { action: 'setMultiplier', multiplier: multiplier });
      } else {
        console.error('No active tab found when trying to start clicking.');
      }
    } catch (error) {
      console.error('Error executing script or sending message:', error);
    }
  }
});
