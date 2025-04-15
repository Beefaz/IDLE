document.addEventListener('DOMContentLoaded', () => {
  const multiplierInput = document.getElementById('multiplier');
  const startButton = document.getElementById('startButton');
  const startBossButton = document.getElementById('startBossButton');
  const statusDiv = document.getElementById('status');

  startButton.addEventListener('click', async () => {
    const multiplier = parseInt(multiplierInput.value, 10);

    if (isNaN(multiplier) || multiplier < 1) {
      statusDiv.textContent = 'Please enter a valid positive number.';
      return;
    }

    statusDiv.textContent = `Action Timer Clicker started with multiplier: ${multiplier}`;

    try {
      const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTabs && activeTabs.length > 0) {
        const activeTabId = activeTabs[0].id;
        chrome.runtime.sendMessage({ action: 'startClicking', multiplier: multiplier });
      } else {
        statusDiv.textContent = 'Error: No active tab found.';
      }
    } catch (error) {
      statusDiv.textContent = `Error querying tabs: ${error}`;
      console.error('Error querying active tab:', error);
    }
  });

  startBossButton.addEventListener('click', async () => {
    statusDiv.textContent = 'Boss Clicker started.';
    try {
      const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (activeTabs && activeTabs.length > 0) {
        chrome.runtime.sendMessage({ action: 'startBossClicker' });
      } else {
        statusDiv.textContent = 'Error: No active tab found to start boss clicker.';
      }
    } catch (error) {
      statusDiv.textContent = `Error querying tabs: ${error}`;
      console.error('Error querying active tab:', error);
    }
  });
});
