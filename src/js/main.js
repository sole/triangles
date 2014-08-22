var THREE = require('three');
var tesselate = require('./tesselate');
var getColors = require('./getColors');

var contentWidth = 320,
	contentHeight = 240;

var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setClearColor(new THREE.Color(0x000000), 1.0);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000);
var cameraTarget = new THREE.Vector3(0, 0, 0);
var cameraPosition = new THREE.Vector3(0, 0, 300);

console.log(getColors());
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResized);
onWindowResized();

var rawGeometry = tesselate([0, 0], [500, 500], 10, 10, 1.5, 1.5, 1); /* always the same seed... for now */


var meshGeometry = new THREE.Geometry();
rawGeometry.vertices.forEach(function(t) {
	t.forEach(function(tt) {
		var v = new THREE.Vector3(tt[0], tt[1], 0);
		meshGeometry.vertices.push(v);
	});
});

var red = new THREE.Color( 0xFF0000 );
var green = new THREE.Color( 0x00FF00 );
var blue = new THREE.Color( 0x0000FF );

rawGeometry.faces.forEach(function(f) {
	var face = new THREE.Face3(f[0], f[1], f[2]);
	face.vertexColors = getColors();
	meshGeometry.faces.push(face);
});

meshGeometry.center();

var betterMesh = new THREE.Mesh(meshGeometry, new THREE.MeshBasicMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } ));
scene.add(betterMesh);

requestAnimationFrame(render);

function onWindowResized() {
	contentWidth = window.innerWidth;
	contentHeight = window.innerHeight;
	renderer.setSize(contentWidth, contentHeight);
	camera.aspect = contentWidth / contentHeight;
	camera.updateProjectionMatrix();
}

function render(time) {
	//requestAnimationFrame(render);
	
	var t = time * 0.0001;
	var r = 200;
	camera.position.set( r * Math.sin(t), 0, r * Math.cos(t));
	//camera.position.copy(cameraPosition);
	camera.lookAt(cameraTarget);
	renderer.clear();
	renderer.render(scene, camera);
}
