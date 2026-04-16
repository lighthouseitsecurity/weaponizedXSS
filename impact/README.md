<p align="justify">This chapter documents the <b>technical impact</b> of an XSS vulnerability (<b>NOTE</b>: different from business impact).</p>

<p align="justify">Some time ago i remember discussing this topic with colleagues and i was consistently encountering the same answer to the question <b>"What can you (actually) do with XSS?"</b>.<br>
The answer was always somewhere along "<i>well... (preparing to instantly provide an obvious list to this (deceptively) simple question) ... (thinking) ... (thinking some more) ... (realizing that the answer to the question is actually not that simple) ... (dramatic pause) ... (what kind of (dumb) question is that, kind of reaction) ... (obviously annoyed by the question) ...<b>ANYTHING!!1!</b></i>". :)<br>
The point being here is that everyone (including myself) was generally aware of the power of XSS but, surprisingly, noone was able to provide a comprehensive list of most/all concrete actions that were possible to achieve via XSS. Always bits and pieces, but never the whole mosaic.</p>

<p align="justify">Since no online resource, i was aware of, provided such a list, i decided to make one.</p>

<p align="justify">The list has evolved over the years and was updated and revised on multiple occassions.
Some categories overlap and can be rearranged differently (this one makes most sense to me).
It is (and will be) work in progres.
In other words, it is not perfect, but provides a good general overview of what can be done with XSS.</p>

<p align="justify">Note that the list covers general options, some of which may be relevant (and some not), depending on the tested web application (i.e. scenario dependent).<br>
Also, it should not be followed blindly - put the focus on understanding the target environment, analyzing all of its functionalities and adapting to it, according to the client's threat model/priorities.</p>

<p align="justify">Overall, i find the list to be a good starting point when mentally fatigued (often the case after finding a bug and having to demonstrate impact straight afterwards) or when just out of ideas.</p>

## TECHNICAL IMPACT

Successful exploitation of the identified vulnerability allows:
* execution of arbitrary JavaScript code, within target user's context (i.e. target user account's session with target web application)

This allows a variety of attack scenarios:
* attacks against target web application
    * [AUTHN] gain control over target user's account (aka *account takeover (ATO)*)
        * steal and impersonate session cookie(s), assigned to target user account's session (aka *session hijacking*)
        * steal access token, assigned to target user's account (aka *access token stealing*)
        * link target user's account with attacker's 3rd party SSO user account (aka *account linking*)
        * change password of target user's account
        * change email address of target user's account (request password reset afterwards)
    * [AUTHN] perform interaction with target web application's accessible functionality via target user account's session (aka *session riding*)
        * carry out any (sensitive) action that target user account is able to perform (aka *session riding*)
            * create new user account (administrative privileges required; *privilege escalation* potential)
        * access and exfiltrate any sensitive data that target user account is able to access (aka *data exfiltration*)
        * leverage relevant functionality of target web application to perform further attacks against target user (aka *social engineering*)
    * [AUTHN/UNAUTHN] perform XSS phishing (aka *credential stealing*)
        * obtain valid credentials/personally identifiable information (PII), in cleartext, related to:
            * target web application
            * 3rd party SSO provider
            * Windows Active Directory
            * Credit Card
    * [AUTHN/UNAUTHN] perform content modification (aka *website defacement*) or availability denial (aka *Denial-of-Service (DoS)*) of target web application
        * permanent (server-side stored XSS)
        * quasi-permanent (non-server-side stored XSS + server-side XSS payload storing functionality (e.g. web cache poisoning))
        * target user account session-wide (client-side stored XSS; very low/no impact)
        * payload execution-wide (reflected XSS; very low/no impact)
* activities on behalf of target user's web browser (i.e. use it as pivot, to:)
    * [AUTHN/UNAUTHN] obtain sensitive information related to target user/target user's account
        * log and exfiltrate key strokes (aka *keylogging*)
        * capture in-browser screenshots
        * capture web camera snapshots
        * query target user device's geolocation
    * [AUTHN/UNAUTHN] perform further attacks against target user (aka *social engineering*)
        * download file/install malware (web browser; OS)
            * Man-in-the-Browser (MitB) attack
                * intercept and manipulate communications between target user and (specific) web application
        * redirect web browser to another website (under attacker's control)
    * [UNAUTHN] perform further attacks against target user's computer infrastructure
        * gather information, related to:
            * target user's web browser
            * target user device's OS
            * target user device's LAN
        * crash (DoS) target user's web browser
        * exploit vulnerabilities in target user's web browser
            * further attack target user device's OS
        * harvest NTLM hashes (to obtain and leverage Windows Active Directory credentials)
        * interact with target user device's LAN
            * perform host discovery/port scanning
            * further attack (any identified) services
