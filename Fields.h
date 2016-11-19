
uint8_t power = 1;
uint8_t brightness = brightnessMap[brightnessIndex];

//String setPower(String value) {
//  power = value.toInt();
//  if(power < 0) power = 0;
//  else if (power > 1) power = 1;
//  return String(power);
//}

String getPower() {
  return String(power);
}

//String setBrightness(String value) {
//  brightness = value.toInt();
//  if(brightness < 0) brightness = 0;
//  else if (brightness > 255) brightness = 255;
//  return String(brightness);
//}

String getBrightness() {
  return String(brightness);
}

String getPattern() {
  return String(currentPatternIndex);
}

String getPatterns() {
  String json = "";

  for (uint8_t i = 0; i < patternCount; i++) {
    json += "\"" + patterns[i].name + "\"";
    if (i < patternCount - 1)
      json += ",";
  }

  return json;
}

String getAutoplay() {
  return String(autoplay);
}

String getAutoplayDuration() {
  return String(autoplayDuration);
}

String getSolidColor() {
  return String(solidColor.r) + "," + String(solidColor.g) + "," + String(solidColor.b);
}

String getCooling() {
  return String(cooling);
}

String getSparking() {
  return String(sparking);
}

String getSpeed() {
  return String(speed);
}

FieldList fields = {
  { "power", "Power", BooleanFieldType, getPower },
  { "brightness", "Brightness", NumberFieldType, getBrightness },
  { "pattern", "Pattern", SelectFieldType, getPattern, getPatterns },
  { "speed", "Speed", NumberFieldType, getSpeed },
  { "autoplay", "Autoplay", SectionFieldType },
  { "autoplay", "Autoplay", BooleanFieldType, getAutoplay },
  { "autoplayDuration", "Autoplay Duration", NumberFieldType, getAutoplayDuration },
  { "solidColor", "Solid Color", SectionFieldType },
  { "solidColor", "Color", ColorFieldType, getSolidColor },
  { "fire", "Fire & Water", SectionFieldType },
  { "cooling", "Cooling", NumberFieldType, getCooling },
  { "sparking", "Sparking", NumberFieldType, getSparking },
};

uint8_t fieldCount = ARRAY_SIZE(fields);
