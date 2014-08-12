var THREE = require('three');
var tesselate = require('./tesselate');

var contentWidth = 320,
	contentHeight = 240;

var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000);


document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResized);
onWindowResized();

var triangles = tesselate([0, 0], [100, 100]);

console.log(triangles);

function onWindowResized() {
	contentWidth = window.innerWidth;
	contentHeight = window.innerHeight;
	renderer.setSize(contentWidth, contentHeight);
	camera.aspect = contentWidth / contentHeight;
	camera.updateProjectionMatrix();
}

renderer.render(scene, camera);
