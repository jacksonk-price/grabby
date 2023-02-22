fetch(chrome.runtime.getURL('/grabby.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforeend', html);
});
console.log('made it to the end of script');