# Drupal

## Test Environment

### Installed Software

* Dupal 10.2.2
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
* [RCE] Install Module
* **NOTE**: Drupal has no built-in PHP code editor installed, by default - to use one, the install module functionality is to be leveraged, resulting in an already documented scenario (i.e. that is why no "patch file" vector was documented)

### Unauthenticated XSS

* [Phish] Iframe Login Page
