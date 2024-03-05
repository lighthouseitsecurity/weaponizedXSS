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

This section is included to provide an overview of recommended countermeasures for addressing security risks, related to documented XSS payloads.

* perform periodic technical IT security assessments of target organization's external and internal web applications
  * depending on the current security maturity level and available resources of the target organization, the following assessments should be considered:
    * penetration tests
    * source code review
    * red teaming
    * bug bounty
* provide end-user IT security education and security awareness trainings to target organization's employees
