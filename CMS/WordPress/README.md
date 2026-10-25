# WordPress

WordPress [1] is a free and open-source CMS written in PHP.

As of 2026 [2, 3], WordPress:
* holds a **58.3% market share** for CMS-powered websites (39.6% of all websites)
* is used by over **10,000,000 websites**

## Test Environment

### Installed Software

* WordPress 6.8
* PHP 8.3.6
* MySQL 8.0.41
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
* [RCE] Install Plugin 
* [RCE] Patch File - theme `function.php`

### Unauthenticated XSS

* [Phish] Iframe Login Page

## References

[1] [https://wordpress.com/](https://wordpress.com/)

[2] [https://w3techs.com/technologies/details/cm-wordpress](https://w3techs.com/technologies/details/cm-wordpress)

[3] [https://whatcms.org/c/WordPress](https://whatcms.org/c/WordPress)
