chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchContent') {
        chrome.tabs.query({ active: true }, (tabs) => {
            if (tabs[0].id) {
                chrome.tabs.sendMessage(
                    tabs[0].id,
                    { action: 'getPageContent' },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.error(
                                'Error:',
                                chrome.runtime.lastError.message,
                            );
                        } else {
                            sendResponse(response);
                        }
                    },
                );
            } else {
                console.error('No active tab found!');
            }
        });
        return true; // Indicates that response will be sent asynchronously.
    }
});
