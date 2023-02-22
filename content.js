const renderHTMLTemplate = () => {
  fetch(chrome.runtime.getURL('/grabby.html')).then(r => r.text()).then(html => {
    document.body.insertAdjacentHTML('beforeend', html);
  });
}

const retrieveImages = () => {
  return document.getElementsByTagName('img');
}

const obtainSrcCollection = () => {
  let images = retrieveImages();
  let imageSources = [];

  for (let i = 0; i < images.length - 1; i++) {
    imageSources.push(images[i]['src']);
  }

  return imageSources;
}

const generateImagesDisplay = () => {
  let srcCollection = obtainSrcCollection();
  let selectedImagesList = document.body.querySelector('#selected-div');
  console.log('image list div!');
  console.log(selectedImagesList);
  for (let i = 0; i < srcCollection.length; i++) {
    let img = document.createElement('img');
    img.src = srcCollection[i];
    img.style.width = '50px';
    img.style.height = '50px';
    selectedImagesList.appendChild(img);
  }
  console.log('finishd image diplsay...');
}

renderHTMLTemplate();
setTimeout(function() { 
  console.log('starting wait..');
  generateImagesDisplay(); 
  console.log('done waiting');

}, 5000)


console.log('made it to the end of script');