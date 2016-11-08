var data =
{
  status: "Loading, please wait...",
  fields: [
    {
      name: "power",
      label: "Power",
      type: "Boolean",
      value: 1
    }
    ,
    {
      name: "brightness",
      label: "Brightness",
      type: "Number",
      value: 255
    },
    {
      name: "autoplay",
      label: "Autoplay",
      type: "Boolean",
      value: 0
    },
    {
      name: "autoplayDuration",
      label: "Autoplay Duration",
      type: "Number",
      value: 10
    },
    {
      name: "solidColor",
      label: "Color",
      type: "Color",
      value: "rgb(130, 89, 104)"
    },
    {
      name: "cooling",
      label: "Cooling",
      type: "Number",
      value: 49,
      "min": 0,
      "max": 255
    },
    {
      name: "sparking",
      label: "Sparking",
      type: "Number",
      value: 10,
      "min": 0,
      "max": 255
    }
    ,
    {
      name: "pattern",
      label: "Pattern",
      type: "Select",
      "selectedIndex": 0,
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
    }
  ]
};

var viewModel = ko.mapping.fromJS(data);

ko.applyBindings(viewModel);

$(".minicolors").minicolors(
  {
    theme: "bootstrap",
    changeDelay: 200,
    control: "wheel",
    format: "rgb",
    inline: true
  });
