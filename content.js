let images = document.getElementsByTagName("img");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getImages") {
        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            imageUrls.push(images[i].src);
        }

        let uniqueUrls = [...new Set(imageUrls)];
    
        sendResponse({ images: uniqueUrls });
    }
});