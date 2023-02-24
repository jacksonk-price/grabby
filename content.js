let images = document.getElementsByTagName("img");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "getImages") {
        console.log('hello world');
        let imageUrls = [];
        for (let i = 0; i < images.length; i++) {
            imageUrls.push(images[i].src);
        }
    
        sendResponse({ images: imageUrls });
    }
});