outputDir=build
arduinoDir=C:/Users/Jason/dev/arduino-1.6.12
arduinoDataDir=C:/Users/Jason/AppData/Local/Arduino15
arduinoSketchBookDir=C:/Users/Jason/Documents/Arduino

mkdir -p $outputDir/

$arduinoDir/arduino-builder -compile -logger=machine -hardware $arduinoDir/hardware -hardware $arduinoDataDir/packages -hardware $arduinoSketchBookDir/hardware -tools $arduinoDir/tools-builder -tools $arduinoDir/hardware/tools/avr -tools $arduinoDataDir/packages -built-in-libraries $arduinoDir/libraries -libraries $arduinoSketchBookDir/libraries -fqbn=esp8266:esp8266:d1_mini:CpuFrequency=160,UploadSpeed=921600,FlashSize=4M3M -ide-version=10612 -build-path $outputDir/ -warnings=none -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.esptool.path=$arduinoDataDir/packages/esp8266/tools/esptool/0.4.9 -prefs=runtime.tools.xtensa-lx106-elf-gcc.path=$arduinoDataDir/packages/esp8266/tools/xtensa-lx106-elf-gcc/1.20.0-26-gb404fb9-2 -prefs=runtime.tools.mkspiffs.path=$arduinoDataDir/packages/esp8266/tools/mkspiffs/0.1.2 -verbose tree-v2.ino
