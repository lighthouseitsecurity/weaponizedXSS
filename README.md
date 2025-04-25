# Weaponized XSS Payloads

* a collection of XSS payloads used for:
  * increasing impact (Bug Bounties; P3 ➔ P1)
  * phishing attacks (Red Teaming)
* can also be used for raising security awareness via trainings/demos

* all of the documented payloads were explicitly confirmed to be working
  * tested in specified lab environment (as documented, per respective payload)
  * respective code can be further minimized (e.g. shorten variable names, rewrite or remove some parts of code)
  * it may be necessary to further adjust or change a payload, depending on the target environment (e.g. WAF bypass)
    * process not documented here (out of scope)

* **NOTE**: this project is work in progress - new content will be progressively added (when possible, time wise; low priority)

## Recommendations

<p align="justify">This section is included to provide an overview of recommended countermeasures for addressing security risks, related to documented XSS payloads.<p>

* [**all**] perform periodic technical IT security assessments of target organization's external and internal web applications
  * depending on the current security maturity level and available resources of the target organization, the following assessments should be considered:
    * penetration test
    * source code review
    * red teaming
    * bug bounty
* [**all**] provide end-user IT security education and security awareness trainings to target organization's employees
* [**iframe login**] set directive for `X-Frame-Options` to `DENY` [1] for all affected login pages

[1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options

## Donations

<p align="justify">The content available on this page is free of charge. In case you found any information documented here helpful and/or learned something new and/or it saved time or you just want to support this initiative, please consider donating.</p>

Currently supported donation options:

* Monero [XMR] - `86yQrfxwFjmXj75GzVts5XDAct7RZ177JVco6e1VoW7jGCoK1FgrjoPdtn1H5k4YibXkXJ7sFWEkwJ5ab6odydFeJxnWFSM`

<p align="center">
  <kbd>
    <picture>
      <source media="" srcset="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/images/qr/qr_xss.png">
      <img src="https://raw.githubusercontent.com/lighthouseitsecurity/weaponizedXSS/refs/heads/main/images/qr/qr_xss.png">
    </picture>
  </kbd>
</p>

<p align="justify">Received donations will also result with more frequent content updates.</p>

Thanks!
