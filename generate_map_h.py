#!/usr/bin/python2.7
from math import sin, cos, radians

NUM_LEDS = 300
LEDS_PER_CIRCLE = [115, 85, 55, 35, 10]

### end user space ###

ledsPerLevel = LEDS_PER_CIRCLE
radii = []
radii_levels = []
levelStart = []
levelEnd = []
angles = []
angles_steps = []
levels = []
zCoords = []
xCoords = []
yCoords = []

zCoords_step = 255.0 / NUM_LEDS


for x in xrange(len(LEDS_PER_CIRCLE)):
    radii_levels.append(255 - (x * (255 / (len(LEDS_PER_CIRCLE) - 1))))
    if x == 0:
        levelStart.append(0)
        levelEnd.append(LEDS_PER_CIRCLE[0] - 1)
    else:
        levelStart.append(levelEnd[x - 1] + 1)
        levelEnd.append(levelStart[x] + LEDS_PER_CIRCLE[x] - 1)
    angles_steps.append(255.0 / LEDS_PER_CIRCLE[x])

current_circle = 0
current_angle = 0.0
current_zCoords = 0.0
for led in xrange(NUM_LEDS):
    circle_led_sum = 0
    current_radii = 0
    for x in xrange(len(LEDS_PER_CIRCLE)):
        circle_led_sum += LEDS_PER_CIRCLE[x]
        if led < circle_led_sum:
            current_radii = radii_levels[x]
            break
    if led == levelEnd[current_circle] + 1 and led != 0:
        current_angle = 0.0
        current_circle += 1
    radii.append(current_radii)
    levels.append(current_circle)
    angles.append(int(current_angle))
    zCoords.append(int(current_zCoords))
    current_zCoords += zCoords_step
    xCoords.append(int(128 + (current_radii / 2) * cos(radians((current_angle/256)*360))))
    yCoords.append(int(128 + (current_radii / 2) * sin(radians((current_angle/256)*360))))
    current_angle += angles_steps[current_circle]

print("const uint16_t radii[NUM_LEDS] = {")
print str(radii)[1:-1]
print("};")

print("const uint16_t angles[NUM_LEDS] = {")
print str(angles)[1:-1]
print("};")

print("const uint8_t levelCount = " + str(len(LEDS_PER_CIRCLE)) + ";")
print("const uint8_t ledsPerLevel[levelCount] = {")
print str(LEDS_PER_CIRCLE)[1:-1]
print("};")

print("const uint8_t levelStart[levelCount] = {")
print str(levelStart)[1:-1]
print("};")

print("const uint8_t levelEnd[levelCount] = {")
print str(levelEnd)[1:-1]
print("};")

print("const uint16_t levels[NUM_LEDS] = {")
print str(levels)[1:-1]
print("};")

print("const uint16_t zCoords[NUM_LEDS] = {")
print str(zCoords)[1:-1]
print("};")

print("const uint16_t xCoords[NUM_LEDS] = {")
print str(xCoords)[1:-1]
print("};")

print("const uint16_t yCoords[NUM_LEDS] = {")
print str(yCoords)[1:-1]
print("};")

print("""uint16_t getNearestToAngleAndLevel(uint8_t angle, uint8_t level) {
  uint8_t smallestDifference = 255;
  uint8_t nearestIndex = 0;

  for(uint16_t i = 0; i < NUM_LEDS; i++) {
    if(levels[i] != level)
      continue;

    uint8_t currentAngle = angles[i];

    uint8_t difference = abs(currentAngle - angle);

    if(difference > smallestDifference)
      continue;
    else if (difference == smallestDifference && random8() > 127)
      continue;

    smallestDifference = difference;
    nearestIndex = i;
  }

  return nearestIndex;
}""")
