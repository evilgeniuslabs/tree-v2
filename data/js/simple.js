// used when hosting the site on the ESP8266
var address = location.hostname;
var urlBase = "";

// used when hosting the site somewhere other than the ESP8266 (handy for testing without waiting forever to upload to SPIFFS)
// var address = "192.168.1.13";
// var urlBase = "http://" + address + "/";

var postColorTimer = {};
var postValueTimer = {};

var ignoreColorChange = false;

var colors = [
  "#ff0000",
  "#ff4000",
  "#ff8000",
  "#ffbf00",
  "#ffff00",
  "#bfff00",
  "#80ff00",
  "#40ff00",
  "#00ff00",
  "#00ff40",
  "#00ff80",
  "#00ffbf",
  "#00ffff",
  "#00bfff",
  "#0080ff",
  "#0040ff",
  "#0000ff",
  "#4000ff",
  "#8000ff",
  "#bf00ff",
  "#ff00ff",
  "#ff00bf",
  "#ff0080",
  "#ff0040",
  "#ff0000"
];

var patterns = [
  { index: 0, name: "Pride" },
  { index: 1, name: "Pride 2" },

  { index: 2, name: "Color Waves" },
  { index: 3, name: "Color Waves 2" },

  { index: 15, name: "Falling Rainbow" },
  { index: 16, name: "Rising Rainbow" },

  { index: 20, name: "Falling Palette" },
  { index: 21, name: "Rising Palette" },

  // twinkle patterns
  { index: 22, name: "Rainbow Twinkles" },
  { index: 23, name: "Snow Twinkles" },
  { index: 24, name: "Cloud Twinkles" },
  { index: 25, name: "Incandescent Twinkles" },

  // TwinkleFOX patterns
  { index: 26, name: "Retro C9 Twinkles" },
  { index: 27, name: "Red & White Twinkles" },
  { index: 28, name: "Blue & White Twinkles" },
  { index: 29, name: "Red, Green & White Twinkles" },
  { index: 30, name: "Fairy Light Twinkles" },
  { index: 31, name: "Snow 2 Twinkles" },
  { index: 32, name: "Holly Twinkles" },
  { index: 33, name: "Ice Twinkles" },
  { index: 34, name: "Party Twinkles" },
  { index: 35, name: "Forest Twinkles" },
  { index: 36, name: "Lava Twinkles" },
  { index: 37, name: "Fire Twinkles" },
  { index: 38, name: "Cloud 2 Twinkles" },
  { index: 39, name: "Ocean Twinkles" },

  { index: 40, name: "Candy Cane" },

  { index: 52, name: "Rainbow" },
  { index: 53, name: "Rainbow With Glitter" },
  { index: 54, name: "Solid Rainbow" },
  { index: 55, name: "Confetti" },
  { index: 56, name: "Sinelon" },
  { index: 57, name: "Beat" },
  { index: 58, name: "Juggle" },
  { index: 59, name: "Fire" },
  { index: 60, name: "Water" },

];

$(document).ready(function() {
  $("#status").html("Loading, please wait...");

  addColorButtons();
  addPatternButtons();

  $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });

  $("#status").html("Ready");
});

function addColorButtons() {
  $.each(colors, function(index, color) {
    var template = $("#colorButtonTemplate").clone();

    template.attr("id", "color-button-" + index);

    var button = template.find(".btn-color");
    button.css("background", color);

    button.click(function() {
      var rgb = $(this).css('backgroundColor');
      var components = rgbToComponents(rgb);

      postColor("solidColor", components);
    });

    $("#colorButtonsRow").append(template);
  });
}

function addPatternButtons() {
  $.each(patterns, function(index, pattern) {
    var template = $("#patternButtonTemplate").clone();

    template.attr("id", "pattern-button-" + index);

    var button = template.find(".btn-pattern");

    button.text(pattern.name);

    button.click(function() {
      postValue("pattern", pattern.index);
    });

    $("#patternGrid").append(template);
  });
}

function postValue(name, value) {
  $("#status").html("Setting " + name + ": " + value + ", please wait...");

  var body = { name: name, value: value };

  $.post(urlBase + name + "?value=" + value, body, function(data) {
    if (data.name != null) {
      $("#status").html("Set " + name + ": " + data.name);
    } else {
      $("#status").html("Set " + name + ": " + data);
    }
  });
}

function delayPostValue(name, value) {
  clearTimeout(postValueTimer);
  postValueTimer = setTimeout(function() {
    postValue(name, value);
  }, 300);
}

function postColor(name, value) {
  $("#status").html("Setting " + name + ": " + value.r + "," + value.g + "," + value.b + ", please wait...");

  var body = { name: name, r: value.r, g: value.g, b: value.b };

  $.post(urlBase + name + "?r=" + value.r + "&g=" + value.g + "&b=" + value.b, body, function(data) {
    $("#status").html("Set " + name + ": " + data);
  })
  .fail(function(textStatus, errorThrown) { $("#status").html("Fail: " + textStatus + " " + errorThrown); });
}

function delayPostColor(name, value) {
  clearTimeout(postColorTimer);
  postColorTimer = setTimeout(function() {
    postColor(name, value);
  }, 300);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToComponents(rgb) {
  var components = {};

  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  components.r = parseInt(rgb[1]);
  components.g = parseInt(rgb[2]);
  components.b = parseInt(rgb[3]);

  return components;
}
