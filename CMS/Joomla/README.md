# Joomla

Joomla is a free and open-source CMS written in PHP.

As of 2025 [[1](https://w3techs.com/technologies/details/cm-joomla), [2](https://whatcms.org/c/Joomla)], Joomla:
* holds a **2.1% market share** for CMS-powered websites (1.5% of all websites)
* used by over **870,000 websites**

## Test Environment

### Installed Software

* Joomla 5.3.0
* PHP 8.3.6
* MariaDB 10.11.11
* Apache 2.4.58
* Ubuntu 24.04.2 LTS
* **NOTE**: all default installations

### Vulnerable Page (`rxss.php`)

```
<?php echo '<div>' . $_GET['q'] . '</div>'; ?>
```

## Overview

### Authenticated XSS (administrative privileges)

* [ATO] Create New Admin User
* [RCE] Install Module
* [RCE] Patch File - template `error.php`

### Unauthenticated XSS

* [Phish] Iframe Login Page
