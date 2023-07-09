chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getImages" }, function (response) {
    const imageUrls = response.images;

    startExtension(imageUrls);
  });
});

function startExtension(imageUrls) {
  const imageContainer = document.getElementById("image-container");
  const headerDiv = document.getElementById('head');
  const selectAllBtn = document.getElementById('select-all');
  const downloadBtn = document.getElementById('download-btn');

  function appendImagesToDOM() {
    for (let i = 0; i < imageUrls.length; i++) {
      const imageBox = createImageBox();
      const image = createImageElement(imageUrls[i]);
      imageBox.appendChild(image);
      imageContainer.appendChild(imageBox);
    }
  }

  function appendImageCountToDOM(imageCount) {
    const pTag = document.createElement('p');
    pTag.innerHTML = `${imageCount} Images Found`;
    headerDiv.appendChild(pTag);
  }

  function createImageBox() {
    const div = document.createElement('div');
    div.addEventListener('click', function() {
      toggleSelectBox(div);
    });
    div.classList.add("image-box");
  
    return div;
  }

  function createImageElement(src) {
    let img = document.createElement('img');
    img.classList.add('collected-image');
    img.src = src;
  
    return img;
  }

  function toggleSelectAll() {
    const unselectedImageBoxes = getUnselectedBoxes();
  
    if (unselectedImageBoxes.length > 0) {
      for (let i = 0; i < unselectedImageBoxes.length; i++) {
        toggleSelectBox(unselectedImageBoxes[i]);
      }

      updateSelectButtonText(true);
    } else {
      const selectedImageBoxes = getSelectedBoxes();

      for (let i = 0; i < selectedImageBoxes.length; i++) {
        toggleSelectBox(selectedImageBoxes[i]);
      }

      updateSelectButtonText(false);
    }
    updateDownloadButton();
  }

  function toggleSelectBox(imageBox) {
    imageBox.classList.toggle('selected');
    updateDownloadButton();
  
    const unselectedImageBoxes = getUnselectedBoxes();

    if (unselectedImageBoxes.length > 0) {
      updateSelectButtonText(false);
    } else {
      updateSelectButtonText(true);
    }
  }

  function downloadSelected() {
    const selectedImages = document.querySelectorAll("div.image-box.selected img");

    for (let i = 0; i < selectedImages.length; i++) {
      const a = document.createElement('a');
      a.href = selectedImages[i]['src'];
      a.download = 'image';
      a.setAttribute('target', '_self');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  function updateSelectButtonText(boolSelectedAll) {
    if (boolSelectedAll) {
      selectAllBtn.innerHTML = "Deselect All";
    } else {
      selectAllBtn.innerHTML = "Select All";
    }
  }

  function updateDownloadButton() {
    const selectedBoxes = getSelectedBoxes();
  
    if (selectedBoxes.length > 0) {
      downloadBtn.classList.remove('hide');
      downloadBtn.innerHTML = `Download ${selectedBoxes.length} Images` 
    } else {
      downloadBtn.classList.add('hide');
    }
  }

  function getSelectedBoxes() {
    return document.querySelectorAll("div.image-box.selected");
  }

  function getUnselectedBoxes() {
    return document.querySelectorAll("div.image-box:not(.selected)");
  }
  
  document.getElementById('select-all').addEventListener('click', toggleSelectAll);
  document.getElementById('download-btn').addEventListener('click', downloadSelected);

  appendImageCountToDOM(imageUrls.length);
  appendImagesToDOM();
}