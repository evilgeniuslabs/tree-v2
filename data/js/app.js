// used when hosting the site on the ESP8266
var address = location.hostname;
var urlBase = "";

// used when hosting the site somewhere other than the ESP8266 (handy for testing without waiting forever to upload to SPIFFS)
// var address = "esp8266-1920f7.local";
// var urlBase = "http://" + address + "/";

var postColorTimer = {};
var postValueTimer = {};

var ignoreColorChange = false;

var ws = new ReconnectingWebSocket('ws://' + address + ':81/', ['arduino']);
ws.debug = true;

ws.onmessage = function(evt) {
  if(evt.data != null)
  {
    var data = JSON.parse(evt.data);
    if(data == null) return;
    updateFieldValue(data.name, data.value);
  }
}

$(document).ready(function() {
  $("#status").html("Connecting, please wait...");

  $.get(urlBase + "all", function(data) {
      $("#status").html("Loading, please wait...");

      $.each(data, function(index, field) {
        if (field.type == "Number") {
          addNumberField(field);
        } else if (field.type == "Boolean") {
          addBooleanField(field);
        } else if (field.type == "Select") {
          addSelectField(field);
        } else if (field.type == "Color") {
          addColorFieldPicker(field);
          addColorFieldButtons(field);
        } else if (field.type == "Section") {
          addSectionField(field);
        }
      });

      $(".minicolors").minicolors({
        theme: "bootstrap",
        changeDelay: 200,
        control: "wheel",
        format: "rgb",
        inline: true
      });

      $("#status").html("Ready");
    })
    .fail(function(errorThrown) {
      console.log("error: " + errorThrown);
    });
});

function addNumberField(field) {
  var template = $("#numberTemplate").clone();

  template.attr("id", "form-group-" + field.name);
  template.attr("data-field-type", field.type);

  var label = template.find(".control-label");
  label.attr("for", "input-" + field.name);
  label.text(field.label);

  var addon = template.find(".input-group-addon");
  addon.text(field.value);

  var input = template.find(".form-control");
  input.attr("id", "input-" + field.name);
  if (field.min) {
    input.attr("min", field.min);
  }
  if (field.max) {
    input.attr("max", field.max);
  }
  if (field.step) {
    input.attr("step", field.step);
  }
  input.val(field.value);

  input.on("change mousemove", function() {
    addon.text($(this).val());
  });

  input.on("change", function() {
    var value = $(this).val();
    addon.text(value);
    field.value = value;
    delayPostValue(field.name, value);
  });

  $("#form").append(template);
}

function addBooleanField(field) {
  var template = $("#booleanTemplate").clone();

  template.attr("id", "form-group-" + field.name);
  template.attr("data-field-type", field.type);

  var label = template.find(".control-label");
  label.attr("for", "btn-group-" + field.name);
  label.text(field.label);

  var btngroup = template.find(".btn-group");
  btngroup.attr("id", "btn-group-" + field.name);

  var btnOn = template.find("#btnOn");
  var btnOff = template.find("#btnOff");

  btnOn.attr("id", "btnOn" + field.name);
  btnOff.attr("id", "btnOff" + field.name);

  btnOn.attr("class", field.value ? "btn btn-primary" : "btn btn-default");
  btnOff.attr("class", !field.value ? "btn btn-primary" : "btn btn-default");

  btnOn.click(function() {
    setBooleanFieldValue(field, btnOn, btnOff, 1)
  });
  btnOff.click(function() {
    setBooleanFieldValue(field, btnOn, btnOff, 0)
  });

  $("#form").append(template);
}

function addSelectField(field) {
  var template = $("#selectTemplate").clone();

  template.attr("id", "form-group-" + field.name);
  template.attr("data-field-type", field.type);

  var id = "input-" + field.name;

  var label = template.find(".control-label");
  label.attr("for", id);
  label.text(field.label);

  var select = template.find(".form-control");
  select.attr("id", id);

  for (var i = 0; i < field.options.length; i++) {
    var optionText = field.options[i];
    var option = $("<option></option>");
    option.text(optionText);
    option.attr("value", i);
    select.append(option);
  }

  select.val(field.value);

  select.change(function() {
    var value = template.find("#" + id + " option:selected").index();
    postValue(field.name, value);
  });

  $("#form").append(template);
}

function addColorFieldPicker(field) {
  var template = $("#colorTemplate1").clone();

  template.attr("id", "form-group-" + field.name);
  template.attr("data-field-type", field.type);

  var id = "input-" + field.name;

  var label = template.find(".control-label");
  label.attr("for", id);
  label.text(field.label);

  var input = template.find(".form-control");
  input.attr("id", id);

  input.val("rgb(" + field.value + ")");

  input.on("change", function() {
    if (ignoreColorChange) return;

    var value = $(this).val();
    var components = rgbToComponents(value);
    field.value = components.r + "," + components.g + "," + components.b;
    delayPostColor(field.name, components);
  });

  $("#form").append(template);
}

function addColorFieldButtons(field) {
  var template = $("#colorTemplate2").clone();

  var buttons = template.find(".btn-color");

  buttons.each(function(index, button) {
    $(button).click(function() {
      var rgb = $(this).css('backgroundColor');
      var components = rgbToComponents(rgb);

      field.value = components.r + "," + components.g + "," + components.b;
      postColor(field.name, components);

      ignoreColorChange = true;
      $("#input-" + field.name).minicolors("value", "rgb(" + field.value + ")");
      ignoreColorChange = false;
    });
  });

  $("#form").append(template);
}

function addSectionField(field) {
  var template = $("#sectionTemplate").clone();

  template.attr("id", "form-group-section-" + field.name);
  template.attr("data-field-type", field.type);

  $("#form").append(template);
}

function updateFieldValue(name, value) {
  var group = $("#form-group-" + name);

  var type = group.attr("data-field-type");

  if (type == "Number") {
    var input = group.find(".form-control");
    input.val(value);
  } else if (type == "Boolean") {
    var btnOn = group.find("#btnOn" + name);
    var btnOff = group.find("#btnOff" + name);

    btnOn.attr("class", value ? "btn btn-primary" : "btn btn-default");
    btnOff.attr("class", !value ? "btn btn-primary" : "btn btn-default");

  } else if (type == "Select") {
    var select = group.find(".form-control");
    select.val(value);
  } else if (type == "Color") {
    var input = group.find(".form-control");
    input.val("rgb(" + value + ")");
  }
};

function setBooleanFieldValue(field, btnOn, btnOff, value) {
  field.value = value;

  btnOn.attr("class", field.value ? "btn btn-primary" : "btn btn-default");
  btnOff.attr("class", !field.value ? "btn btn-primary" : "btn btn-default");

  postValue(field.name, field.value);
}

function postValue(name, value) {
  $("#status").html("Setting " + name + ": " + value + ", please wait...");

  $.post(urlBase + name + "?value=" + value, function(data) {
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

  $.post(urlBase + name + "?r=" + value.r + "&g=" + value.g + "&b=" + value.b, function(data) {
    $("#status").html("Set " + name + ": " + value.r + "," + value.g + "," + value.b);
  });
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
