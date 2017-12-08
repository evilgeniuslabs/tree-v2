struct Meteor {
  uint8_t angle = random8();
  uint8_t level = random8(levelCount);
};

const uint8_t meteorCount = 1;
Meteor meteors[meteorCount];

uint16_t getMeteorLedIndexAndUpdate(uint8_t meteorIndex) {
  Meteor meteor = meteors[meteorIndex];

  uint16_t i = getNearestToAngleAndLevel(meteor.angle, meteor.level);

  EVERY_N_MILLISECONDS(60) {
    meteor.level--;

    if (meteor.level == 0) {
      meteor.level = levelCount;
      meteor.angle = random8();
    }
    else if (meteor.level == levelCount) {
      if(random16() > 30000) {
        meteor.level = levelCount - 1;
      }
    }

    meteors[meteorIndex] = meteor;
  }

  if (meteor.level >= levelCount) {
    return NUM_LEDS;
  }

  return i;
}

void whiteMeteors() {
  dimAll(220);

  EVERY_N_MILLISECONDS(30) {
    for (uint16_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
      uint16_t i = getMeteorLedIndexAndUpdate(meteorIndex);

      if(i < NUM_LEDS) {
        leds[i] = CRGB(255, 255, 255);
      }
    }
  }
}

void paletteMeteors() {
  dimAll(220);

  for (uint16_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
    uint16_t i = getMeteorLedIndexAndUpdate(meteorIndex);

    if(i < NUM_LEDS) {
      leds[i] = ColorFromPalette(gCurrentPalette, gHue);
    }
  }
}

void rainbowMeteors() {
  dimAll(220);

  for (uint16_t meteorIndex = 0; meteorIndex < meteorCount; meteorIndex++) {
    uint16_t i = getMeteorLedIndexAndUpdate(meteorIndex);

    if(i < NUM_LEDS) {
      leds[i] = CHSV(gHue, 255, 255);
    }
  }
}
