Tree - v2
========================

White xmas tree with 250 8mm WS2811 RGB LEDs, driven with an ESP8266, and controlled via a web app over Wi-Fi and/or IR remote control.

![Fermat - Lux Phyllotaxis](https://d3s5r33r268y59.cloudfront.net/13194/products/thumbs/2016-06-25T22:28:38.450Z-fermat1.png.855x570_q85_pad_rcrop.jpg)

Hardware
--------

* 250 x 8mm WS2811 Addressable RGB LED string
* [WeMos D1 mini pro](https://www.wemos.cc/product/d1-mini-pro.html) ESP8266 development board:

[![WeMos D1 mini pro](https://www.wemos.cc/sites/default/files/2016-09/1.jpg)](https://www.wemos.cc/product/d1-mini-pro.html)

Features
--------
* Turn the NeoPixel Ring on and off
* Adjust the brightness
* Change the display pattern
* Adjust the color

Web App
--------

Patterns are requested by the app from the ESP8266, so as new patterns are added, they're automatically listed in the app.

The web app is stored in SPIFFS (on-board flash memory).

The web app is a single page app with separate files for js and css, using [jQuery](https://jquery.com) and [Bootstrap](http://getbootstrap.com).  It has buttons for On/Off, a slider for brightness, a pattern selector, and a color picker (using [jQuery MiniColors](http://labs.abeautifulsite.net/jquery-minicolors)).  Event handlers for the controls are wired up, so you don't have to click a 'Send' button after making changes.  The brightness slider and the color picker use a delayed event handler, to prevent from flooding the ESP8266 web server with too many requests too quickly.

Infrared Remote Control
-----------------------

Control via infrared remote control is also supported, via the [ESP8266 port of the IRremote library](https://github.com/markszabo/IRremoteESP8266).

Compiling
---------

Follow the instructions on the following pages to install the required software for your OS (Windows, Linux, Mac):

* Install [Arduino](http://www.arduino.cc/en/main/software)
* Install [Arduino core for ESP8266](https://github.com/esp8266/Arduino)

Download and install the following libraries, using the instructions here: https://www.arduino.cc/en/Guide/Libraries

* [FastLED](https://github.com/FastLED/FastLED)
* [WebSocket Server and Client for Arduino](https://github.com/Links2004/arduinoWebSockets)
* [IRremote ESP8266 Library](https://github.com/sebastienwarin/IRremoteESP8266)

Download the Fermat source code here.

In Arduino, choose the following options from the Tools menu:

* Board: WeMos D1 R2 & mini
* Flash Size: 4M (3M SPIFFS)
* CPU Frequency: 160MHz
* Upload Speed: 921600

Select the correct port for your board (it's easiest to unplug any other USB serial devices).

Finally, click the Upload button.  Please report any errors, problems, questions, etc to the [Issue Tracker](https://bitbucket.org/Pup05/fermat/issues).

SPIFFS
-----------

The web app needs to be uploaded to the ESP8266's SPIFFS.  You can do this within the Arduino IDE after installing the [Arduino ESP8266FS tool](https://github.com/esp8266/Arduino/blob/master/doc/filesystem.md#uploading-files-to-file-system).

With ESP8266FS installed run the sketch and then upload the web app using the `ESP8266 Sketch Data Upload` command in the Arduino Tools menu.

Compression
-----------

The web app files can be gzip compressed before uploading to SPIFFS by running `recompress.sh` or the following command:

`gzip -r data/`

The ESP8266WebServer will automatically serve any .gz file.  The file index.htm.gz will get served as index.htm, with the content-encoding header set to gzip, so the browser knows to decompress it.  The ESP8266WebServer doesn't seem to like the Glyphicon fonts gzipped, though, so I decompress them with this command:

`gunzip -r data/fonts/`

REST Web services
-----------------

The firmware implements basic [RESTful web services](https://en.wikipedia.org/wiki/Representational_state_transfer) using the ESP8266WebServer library.  Current values are requested with HTTP GETs, and values are set with POSTs using query string parameters.  It can run in connected or standalone access point modes.

Support
-------

Please report any errors, problems, questions, etc to the [Issue Tracker](https://bitbucket.org/Pup05/tree-v2/issues).
