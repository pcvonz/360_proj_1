//Grab important dom elements
var header_container = document.getElementById("header_container");
var header_text = document.getElementById("header-text");

//initiate boxes
var width = header_container.offsetWidth;
var height = header_container.offsetHeight;
var box = document.createElement('div');
box.className = "box";
var boxes = document.getElementsByClassName("box");

//Array to store all the vector positions the color circle should follow
var array = [new Victor(0,0), new Victor(0,0)]

//idle params
var idle = true;
var idle_vec = new Victor(1, 0);
var SPEED = width / 80;
var move = new Victor(SPEED, 0);

function initialize_boxes(width, height) {
  box.style.width = (1 / width) * 100 + "%";
  box.style.height= (1 / height) * 100 + "%";
  for(i = 0; i < width*height; i++) { 
    header_container.appendChild(box.cloneNode());
  } 
}


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//If the mouse isn't in the header area and isn't moving, start idling
function idle_anim(pos_x, pos_y, boxes) {
  if (idle == true) {
    if(idle_vec.x >= header_container.offsetWidth+100 || idle_vec.x < -1) {
      move = move.invert();
      move.y = getRandomArbitrary(-SPEED, SPEED);
    }
    if(idle_vec.y >= header_container.offsetHeight || idle_vec.y < 0) {
      move.y = getRandomArbitrary(-SPEED, SPEED);
    }
    idle_vec.add(move);
    add_item(idle_vec);
  }
  setTimeout(function() {
    if (array.length > 1) {
      var item = array.shift();
      idle_wait(item.x, item.y, boxes);
    } else if(array.length == 1) {
      var item = array[0];
      idle_wait(item.x, item.y, boxes);
    } else{
      idle_wait(null, null, boxes);
    }
    }, 30);
}

function idle_wait(pos_x, pos_y, boxes) {
    if(pos_x != null) {
      for(var item of boxes) {
        time = Date.now()
        calculate_fill(pos_x, pos_y, item);
      }
    }
    idle_anim(pos_x, pos_y, boxes);
}

//Adjust the speed of the circle on resize
window.onresize = function(event) {
  idle_vec = new Victor(1, 0);
  SPEED = width / 60;
  move = new Victor(SPEED, 0);
};

//Handle when the mouse leaves the box and the screen
header_container.addEventListener("mouseleave", function(e) {
  idle = true;
  idle_vec = new Victor(e.clientX, e.clientY);
});

document.addEventListener("mouseout", function(e) {
  idle = true;
  idle_vec = new Victor(e.clientX, e.clientY);
});

//Handle when the mouse moves over the box and the header text box
header_container.addEventListener("mousemove", function(e) {
    idle = false
    var item = new Victor(e.clientX, e.clientY);
    add_item(item);
 });


header_text.addEventListener("mousemove", function(e) {
    idle = false
    var item = new Victor(e.clientX, e.clientY);
    add_item(item);
});

//Helper function for adding a new vector
//position to the array
function add_item(item) {
  if (array.length == 0) {
    array.push(item);
  } else if(array[array.length -1].distance(item) > 30) {
    array.push(item);
  }
}

//Calculate the fill of a box
//based on the distance from the mouse.
function calculate_fill(pos_x, pos_y, el) {
  var width = header_container.offsetWidth;
  var vec1 = new Victor(pos_x, pos_y);
  var vec2 = new Victor(el.getBoundingClientRect().x,el.getBoundingClientRect().y);
  var dist = (vec2.distance(vec1) / width) * 255;
  el.style.background = "rgb(" +  dist + ", " + dist/8+100 + ", 100)";
}

initialize_boxes(15,15);
idle_anim(0, 0, boxes, 10);

for(var item of boxes) {
  calculate_fill(0,0, item);
};
