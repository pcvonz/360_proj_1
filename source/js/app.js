var dropdown = require('./dropdown.js');
var anim = require('./anim.js');

var work_nav = document.getElementById("work-nav");

work_nav.addEventListener("click", function(e) {
  console.log(e.target);
   e.target.parentNode.id = "selected";
   e.target.parentNode.previousSibling.previousSibling.id = "";
});

if(window.location.hash == "#work") {
   work_nav.id = "selected";
   work_nav.previousSibling.previousSibling.id = "";
}
