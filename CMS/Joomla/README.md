# Joomla

## Test Environment

### Installed Software

* Joomla 5.0.2
* PHP 8.2.12
* MariaDB 10.11.6-2
* Apache 2.4.58
* Ubuntu 24.04 LTS
* **NOTE**: all default installations

### Vulnerable Page (`rxss.php`)

```
<?php echo '<div>' . $_GET['q'] . '</div>'; ?>
```

## Overview

### Authenticated XSS (administrative privileges)

* [Acc] Create New Admin User
* [RCE] Patch File - template `error.php`
* [RCE] Install Module 

### Unauthenticated XSS

* [Phish] Iframe Login Page
