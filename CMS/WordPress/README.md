# WordPress

## Test Environment

### Installed Software

* WordPress 6.4.3
* PHP 8.1.2
* MySQL 8.0.35
* Apache 2.4.52
* Ubuntu 22.04.3 LTS
* **NOTE**: all default installations

### Vulnerable Page (`rxss.php`)

```
<?php echo '<div>' . $_GET['q'] . '</div>'; ?>
```

## Overview

### Authenticated XSS (administrative privileges)

* [Acc] Create New Admin User
* [RCE] Patch File - theme `function.php`
* [RCE] Install Plugin 

### Unauthenticated XSS

* [Phish] Iframe Login Page
