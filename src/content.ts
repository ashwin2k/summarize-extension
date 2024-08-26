chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getPageContent') {
        const xpath =
            '/html/body/div[1]/div[1]/div[6]/div/div/div/div[2]/div/article/div[2]/div[1]/div';
        const result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
        );
        sendResponse({ content: result.singleNodeValue?.textContent });
    }
});
