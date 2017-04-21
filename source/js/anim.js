header_container = document.getElementById("header_container");
var width = header_container.offsetWidth;
var height = header_container.offsetHeight;
var box = document.createElement('div');
box.className = "box";

function initialize_boxes(width, height) {
  box.style.width = (1 / width) * 100 + "%";
  box.style.height= (1 / height) * 100 + "%";
  for(i = 0; i < width*height; i++) { 
    header_container.appendChild(box.cloneNode());
  } 
}

var idle = true;


function idle_anim(pos_x, pos_y, boxes) {
  setTimeout(function() {
    if (array.length > 1) {
      var item = array.shift();
    } else {
      var item = {"x": 0, "y": 0};
    }
      idle_wait(item.x, item.y, boxes);
    }, 1);
}

var array = []

function idle_wait(pos_x, pos_y, boxes) {
    if (pos_x) {
      for(var item of boxes) {
        time = Date.now()
        calculate_fill(pos_x, pos_y, item);
      }
    }
    idle_anim(pos_x, pos_y, boxes);
}


header_container.addEventListener("mouseleave", function(e) {
  idle = true;
  
});
header_container.addEventListener("mousemove", function(e) {
    idle = false
    var item = new Victor(e.clientX, e.clientY);
    add_item(item);
 });

var header_text = document.getElementById("header-text");

header_text.addEventListener("mousemove", function(e) {
    idle = false
    var item = new Victor(e.clientX, e.clientY);
    add_item(item);
});

function add_item(item) {
  if (array.length == 0) {
    array.push(item);
  } else if(array[array.length -1].distance(item) > 30) {
    array.push(item);
  }
}
var boxes = document.getElementsByClassName("box");



function calculate_fill(pos_x, pos_y, el) {
  var width = header_container.offsetWidth;
  var vec1 = new Victor(pos_x, pos_y);
  var vec2 = new Victor(el.getBoundingClientRect().x,el.getBoundingClientRect().y);
  var dist = (vec2.distance(vec1) / width) * 255;
  el.style.background = "rgb(" +  dist + ", " + dist/8+100 + ", 100)";
}
initialize_boxes(15,15);
idle_anim(0, 0, boxes, 10);
