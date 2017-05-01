var dropdown = require('./dropdown.js');
var anim = require('./anim.js');
var THREE = require('three');

//var scene, camera, renderer;
//var geometry, material, mesh;
//
//init();
//
//animate();
//
//function init() {
//  scene = new THREE.Scene();
//  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000);
//  camera.position.z = 1000;
//  geometry = new THREE.BoxGeometry(200, 200, 200);
//  material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false });
//
//  mesh = new THREE.Mesh( geometry, material );
//  scene.add( mesh );
//
//  renderer = new THREE.WebGLRenderer();
//  renderer.setSize( window.innerWidth, window.innerHeight );
//
//  document.body.appendChild( renderer.domElement );
//
//}
//
//var mouse_vec = new Victor();
//
//document.body.addEventListener("mousemove", function(e) {
//  var mouse_vec = new Victor(e.clientX, e.clientY);
//});
//
//function animate() {
//  requestAnimationFrame( animate );
//  
//  renderer.render( scene, camera );
//}
