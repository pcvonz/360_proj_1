//var s = Snap("#svg");
//
//
//
////for(i = 0; i < 8; i++) {
////  for (z = 0; z < 10; z++) { 
////    var x = s.circle(i*(width / 8)+ 50, z*(width / 10) + 20, 10);
////  }
////}
//
//var count = 8;
//
//var group = s.g();
//for(i = 0; i < count; i++) {
//    var x = s.rect(i*(width / count), 0, "100%", height);
//    group.add(x);
//}
//var snaps = Snap.selectAll("rect")
//
//window.onresize = function(event) {
//    var window_width = container.offsetWidth;
//    var scale =  window_width/ width;
//    console.log(scale);
//    group.transform("s" + scale  +", 1" );
//    group.attr({
//      "width": window_width,
//      "transform": "t" + window_width - width +", 0"
//    });
//};
//
//
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

//header_container.addEventListener("mouseleave", function(e) {
//  var auto_animate = true;
//
//});
var idle = true;


function idle_anim(pos_x, pos_y, boxes, offset) {
  if (pos_x > header_container.offsetWidth || pos_x < 0) {
    offset = -offset
  }
  if (false == true) {
    setTimeout(function() {
      idle_wait(pos_x, pos_y, boxes, offset);
    }, 100);
  }
}

function idle_wait(pos_x, pos_y, boxes, offset) {
    for(var item of boxes) {
      time = Date.now()
      calculate_fill(pos_x, pos_y, item);
    }
    //idle_anim(pox_x+20, pos_y, boxes);
    idle_anim(pos_x+offset, pos_y, boxes, offset);
}


header_container.addEventListener("mouseleave", function(e) {
  idle = true;
  idle_anim(e.clientX, e.clientY, boxes, 50);
  
});
header_container.addEventListener("mousemove", function(e) {
    idle = false
    for (var item of boxes) {
      time = Date.now();
      calculate_fill(e.clientX, e.clientY, item);
    }
    var auto_animate = true;
    
 });

var header_text = document.getElementById("header-text");

header_text.addEventListener("mousemove", function(e) {
    idle = false
    for (var item of boxes) {
      time = Date.now();
      calculate_fill(e.clientX, e.clientY, item);
    }
    var auto_animate = true;
    
  
});

var boxes = document.getElementsByClassName("box");



function calculate_fill(pos_x, pos_y, el) {
  var width = header_container.offsetWidth;
  var vec1 = new Victor(pos_x, pos_y);
  var vec2 = new Victor(el.getBoundingClientRect().x,el.getBoundingClientRect().y);
  //var dist = (vec2.distance(vec1) / width) * 255;
  var dist = (vec2.distance(vec1) / width) * 255;
  el.style.background = "rgb(" +  dist + ", " + dist/8+100 + ", 100)";
}
initialize_boxes(15,15);
idle_anim(0, 0, boxes, 10);
