# Drupal

Drupal [1] is a free and open-source web CMS written in PHP.

As of 2026 [1, 2], Drupal:
* holds a **0.9% market share** for CMS-powered websites (0.6% of all websites)
* is used by over **410,000 websites**

## Test Environment

### Installed Software

* Dupal 10.4.6
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
* **NOTES**:
  * as of versions 10.4 and 11, the file upload via URL functionality was removed from Drupal (i.e. "install module" attack vector not available) [4]
  * Drupal has no built-in PHP code editor installed (i.e. "patch file" attack vector not available)
    * alternatives do exist, but are configuration dependent (not documented here)

### Unauthenticated XSS

* [Phish] Iframe Login Page

## References

[1] [https://new.drupal.org/](https://new.drupal.org/)

[2] [https://w3techs.com/technologies/details/cm-drupal](https://w3techs.com/technologies/details/cm-drupal)

[3] [https://whatcms.org/c/Drupal](https://whatcms.org/c/Drupal)

[4] [https://www.drupal.org/project/drupal/issues/3417136](https://www.drupal.org/project/drupal/issues/3417136)
