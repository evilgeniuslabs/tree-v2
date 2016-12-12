struct Meteor {
  uint8_t angle = random8();
  uint8_t level = random8(levelCount);
};

const uint8_t meteorCount = 2;
Meteor meteors[meteorCount];

uint8_t getMeteorLedIndexAndUpdate(uint8_t meteorIndex) {
  Meteor meteor = meteors[meteorIndex];

  uint8_t i = getNearestToAngleAndLevel(meteor.angle, meteor.level);

  meteor.level--;

  if (meteor.level == 0) {
    meteor.level = levelCount - 1;
    meteor.angle = random8();
  }

  meteors[meteorIndex] = meteor;
}

void whiteMeteors() {
  dimAll(240);

  EVERY_N_MILLISECONDS(30) {
    for (uint8_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
      uint8_t i = getMeteorLedIndexAndUpdate(meteorIndex);

      leds[i] = CRGB(255, 255, 255);
    }
  }
}

void paletteMeteors() {
  dimAll(240);

  for (uint8_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
    uint8_t i = getMeteorLedIndexAndUpdate(meteorIndex);

    leds[i] = ColorFromPalette(gCurrentPalette, gHue);
  }
}

void rainbowMeteors() {
  dimAll(240);

  for (uint8_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
    uint8_t i = getMeteorLedIndexAndUpdate(meteorIndex);

    leds[i] = CHSV(gHue, 255, 255);
  }
}
