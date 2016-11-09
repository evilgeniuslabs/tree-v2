var data = {
  status: "Loading, please wait...",
  fields: [{
    name: "power",
    label: "Power",
    type: "Boolean",
    value: 1
  }, {
    name: "brightness",
    label: "Brightness",
    type: "Number",
    value: 255
  }, {
    name: "autoplay",
    label: "Autoplay",
    type: "Boolean",
    value: 0
  }, {
    name: "autoplayDuration",
    label: "Autoplay Duration",
    type: "Number",
    value: 10
  }, {
    name: "solidColor",
    label: "Color",
    type: "Color",
    value: "rgb(255, 255, 255)"
  }, {
    name: "cooling",
    label: "Cooling",
    type: "Number",
    value: 49,
    min: 0,
    max: 255
  }, {
    name: "sparking",
    label: "Sparking",
    type: "Number",
    value: 10,
    min: 0,
    max: 255
  }, {
    name: "pattern",
    label: "Pattern",
    type: "Select",
    value: 1,
    "options": [
      "Pride",
      "Pride 2",
      "Color Waves",
      "Color Waves 2",
      "Northward Rainbow",
      "Northeastward Rainbow",
      "Eastward Rainbow",
      "Southeastward Rainbow",
      "Southward Rainbow",
      "Southwestward Rainbow",
      "Westward Rainbow",
      "Northwestward Rainbow",
      "Rotating Rainbow",
      "Outward Rainbow",
      "Inward Rainbow",
      "Falling Rainbow",
      "Rising Rainbow",
      "Rotating Palette",
      "Outward Palette",
      "Inward Palette",
      "Falling Palette",
      "Rising Palette",
      "Rainbow Twinkles",
      "Snow Twinkles",
      "Cloud Twinkles",
      "Incandescent Twinkles",
      "Rainbow",
      "Rainbow With Glitter",
      "Solid Rainbow",
      "Confetti",
      "Sinelon",
      "Beat",
      "Juggle",
      "Fire",
      "Water",
      "Solid Color"
    ]
  }]
};

// used when hosting the site on the ESP8266
// var address = location.hostname;
// var urlBase = "";

// used when hosting the site somewhere other than the ESP8266 (handy for testing without waiting forever to upload to SPIFFS)
var address = "esp8266-1920f7.local";
var urlBase = "http://" + address + "/";

$(document).ready(function() {
  $.each(data.fields, function(index, field) {
    if (field.type == "Number") {
      addNumberField(field);
    } else if (field.type == "Boolean") {
      addBooleanField(field);
    } else if (field.type == "Select") {
      addSelectField(field);
    }
  });

  $(".minicolors").minicolors({
    theme: "bootstrap",
    changeDelay: 200,
    control: "wheel",
    format: "rgb",
    inline: true
  });
});

function addSelectField(field) {
  var template = $("#selectTemplate").clone();

  template.attr("id", "form-group-" + field.name);

  var id = "input-" + field.name;

  var label = template.find(".control-label");
  label.attr("for", id);
  label.text(field.label);

  var select = template.find(".form-control");
  select.attr("id", id);

  for(var i = 0; i < field.options.length; i++) {
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

function addBooleanField(field) {
  var template = $("#booleanTemplate").clone();

  template.attr("id", "form-group-" + field.name);

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

function addNumberField(field) {
  var template = $("#numberTemplate").clone();

  template.attr("id", "form-group-" + field.name);

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
    postValue(field.name, value);
  });

  $("#form").append(template);
}

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
