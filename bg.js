"use strict";

var img = document.getElementById("image");
document.getElementById("banner").addEventListener("mousemove", function (e) {
  var container = document.getElementById("banner");
  var width = container.offsetWidth,
    height = container.offsetHeight;

  var half_width = width / 2,
    half_height = height / 2;

  var element_rect = container.getBoundingClientRect();

  var center = {
    x: element_rect.x + half_width,
    y: element_rect.y + half_height,
  };

  var x = e.clientX,
    y = e.clientY;

  var new_x = x - center.x;
  var new_y = y - center.y;

  var justify_x = (Math.abs(new_x) / half_width) * 25,
    justify_y = (Math.abs(new_y) / half_height) * 25;

  img.style.left = 50 + (new_x > 0 ? -justify_x : justify_x) + "%";

  img.style.top = 50 + (new_y > 0 ? -justify_y : justify_y) + "%";
});
