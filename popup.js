chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getImages" }, function (response) {
    const imageUrls = response.images;
    appendImageCountToDOM(imageUrls.length);
    appendImagesToDOM(imageUrls);
  });
});

const appendImagesToDOM = (imageUrls) => { 
  const imageContainer = document.querySelector("#image-container");
  for (let i = 0; i < imageUrls.length; i++) {
    let imageBox = createImageBox();
    let image = createImageElement(imageUrls[i]);
    imageBox.appendChild(image);
    imageContainer.appendChild(imageBox);
  }
}

const appendImageCountToDOM = (imageCount) => {
  const headerDiv = document.getElementById('head');
  pTag = document.createElement('p');
  pTag.innerHTML = `${imageCount} Images Found`;
  headerDiv.appendChild(pTag);
}

const createImageBox = () => { 
  let div = document.createElement('div');
  div.addEventListener('click', function() {
    toggleSelectBox(div);
  });
  div.classList.add("image-box");

  return div;
}

const createImageElement = (src) => {
  let img = document.createElement('img');
  img.classList.add('collected-image');
  img.src = src;

  return img;
}

const toggleSelectAll = () => {
  let unselectedImageBoxes = getUnSelectedBoxes();

  if (unselectedImageBoxes.length > 0) {
    for (let i = 0; i < unselectedImageBoxes.length; i++) {
      toggleSelectBox(unselectedImageBoxes[i]);
    }
    updateSelectButtonText(true);
  } else {
    let selectedImageBoxes = getSelectedBoxes();
    for (let i = 0; i < selectedImageBoxes.length; i++) {
      toggleSelectBox(selectedImageBoxes[i]);
    }
    updateSelectButtonText(false);
  }
  updateDownloadButton();
}

const toggleSelectBox = (imageBox) => {
  imageBox.classList.toggle('selected');
  updateDownloadButton();

  let unselectedImageBoxes = getUnSelectedBoxes();
  if (unselectedImageBoxes.length > 0) {
    updateSelectButtonText(false);
  } else {
    updateSelectButtonText(false);
  }
}

const downloadSelected = () => {
  selectedImages = document.querySelectorAll("div.image-box.selected img");
  for (let i = 0; i < selectedImages.length; i++) {
    let a = document.createElement('a');
    a.href = selectedImages[i]['src'];
    a.download = 'image';
    a.setAttribute('target', '_self');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

const updateSelectButtonText = (boolSelectedAll) => {
  const selectAllBtn = document.getElementById('select-all');
  if (boolSelectedAll) {
    selectAllBtn.innerHTML = "Deselect All";
  } else {
    selectAllBtn.innerHTML = "Select All";
  }
}

const updateDownloadButton = () => {
  const selectedBoxes = getSelectedBoxes();
  const downloadBtn = document.getElementById('download-btn');

  if (selectedBoxes.length > 0) {
    downloadBtn.classList.remove('hide');
    downloadBtn.innerHTML = `Download ${selectedBoxes.length} Images` 
  } else {
    downloadBtn.classList.add('hide');
  }
}

const getSelectedBoxes = () => {
  return document.querySelectorAll("div.image-box.selected");
}

const getUnSelectedBoxes = () => {
  return document.querySelectorAll("div.image-box:not(.selected)");
}

document.getElementById('select-all').addEventListener('click', toggleSelectAll);
document.getElementById('download-btn').addEventListener('click', downloadSelected);
