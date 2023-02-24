
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getImages" }, function (response) {
    let images = response.images;
    generateImagesDisplay(images);
  });
});

const generateImagesDisplay = (images) => {
  // refactor this mess
  let srcCollection = images;
  let selectedImagesList = document.body.querySelector('#image-container');
  let headerDiv = document.getElementById('head');
  pTag = document.createElement('p');
  pTag.innerHTML = srcCollection.length + ' Images Found';
  headerDiv.appendChild(pTag);
  for (let i = 0; i < srcCollection.length; i++) {
    imageDiv = createImageBox();
    imageDiv.addEventListener('click', function(){
      if (this.classList.contains('selected')){
        this.classList.remove('selected');
      } else {
        this.classList.add('selected');
      }
    });
    img = createImage(srcCollection[i]);
    imageDiv.appendChild(img);
    selectedImagesList.appendChild(imageDiv);
  }
}

const createImageBox = () => { 
  div = document.createElement('div');
  div.classList.add("image-box");

  return div;
}

const createImage = (src) => {
  let img = document.createElement('img');
  img.classList.add('collected-image');
  img.src = src;

  return img;
}

console.log('made it to the end of script')

