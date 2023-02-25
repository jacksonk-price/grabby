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
    selectBox(div);
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

const selectAll = () => {
  let imageBoxes = document.querySelectorAll("div.image-box:not(.selected)");

  for (let i = 0; i < imageBoxes.length; i++) {
    imageBoxes[i].classList.toggle('selected');
  }
}

const selectBox = (imageBox) => {
  if (imageBox.classList.contains('selected')){
    imageBox.classList.remove('selected');
  } else {
    imageBox.classList.add('selected');
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

document.getElementById('select-all').addEventListener('click', selectAll);
document.getElementById('download-btn').addEventListener('click', downloadSelected);
