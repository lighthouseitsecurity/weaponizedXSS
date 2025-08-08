# [authn] Cookie Jar Overflow

<p align="justify">This payload terminates the current session with the web application, on the client-side (i.e. logs out the victim user account from the web application).<p>

<p align="justify">This is achieved by filling the web browser's cookie jar with a large number of fake cookies. When their number is greater than the limit of the cookie jar (typically, around 300), the web browser will start to overwrite any existing (legitimate) cookies in the cookie jar with these newly created ones. Once this occurs, the cookie jar is filled only with such fake (but valid) cookies.<p>

<p align="justify">In order to completely clear the cookie jar, the next step is to remove them. This is done by assigning each of them an expiry date with a value in the past. The web browser treats all such cookies as invalid and removes them from the cookie jar. Since it contained only expired cookies, the result of this is an empty cookie jar. From this point onwards, it is possible to create new cookies, as required.<p>

<p align="justify">It should be noted that the described process can be used to manipulate <code>HttpOnly</code> cookies, which are otherwise inaccessible by client-side JavaScript. This is possible because the web browser overwrites all cookies, including <code>HttpOnly</code> ones. Since it only receives the cookie's name and value in a HTTP request <code>Cookie</code> header (i.e. no attributes), based on this information, the server-side can not differeniate whether a received cookie is assigned <code>HttpOnly</code> or not. This makes it possible to create a cookie with the same name as a <code>HttpOnly</code> one on the client-side, and, even though it will not have the <code>HttpOnly</code> attribute set, such a cookie will be accepted by the server-side (i.e. accepted as legitimate; under the condition that its value is valid).<p>

Typical use-case scenarios:
* login-CSRF + self-XSS chained attacks
    * IMPACT:
        * Sensitive Information Disclosure
            * CVSS-Confidentiality: MEDIUM/HIGH
        * Account Take Over (ATO)
            * CVSS-Confidentiality: MEDIUM/HIGH
            * CVSS-Integrity: MEDIUM/HIGH
* server-side JavaScript payload storage potential
    * idea: deny any user authenticated context
    * IMPACT: DoS (CVSS-Availability: MEDIUM/HIGH)
    * e.g. stored XSS; web cache poisoning + reflected (DOM) XSS
        * frequently navigated (authenticated) page (e.g. main page/home page/dashboard)

## Code

```
let cookJarLimit = 400;
let postfix1 = '=a;';
let postfix2 = '=a; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
if (location.protocol == 'https:') {
  postfix1 += ' Secure';
}
function fillCookieJar(inputJarLimit, inputPostfix) {
  for(let i=0; i<inputJarLimit; i++) {
    document.cookie = 'cookie' + i + inputPostfix;
  }
}
fillCookieJar(cookJarLimit, postfix1);
fillCookieJar(cookJarLimit, postfix2);
```

## Test Environment

### Web Browsers (20250808)

* [x] Mozilla Firefox 141.0.3 (64-bit)
* [x] Google Chrome 139.0.7258.67 (64-bit)
* [x] Microsoft Edge 139.0.3405.86 (64-bit)

### Vulnerable Page

http://testphp.vulnweb.com/login.php

`test:test`

## Screenshot

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/advanced/jsGadgets/cookieJarOverflow/screenshots/cookieJarOverflow_-_logout_-_1-1.png">
      <img src="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/advanced/jsGadgets/cookieJarOverflow/screenshots/cookieJarOverflow_-_logout_-_1-1.png">
    </picture>
  </kbd>
</p>

## Video

https://github.com/user-attachments/assets/935b6dc9-8f95-4d85-9890-59c94c1ffe8c
