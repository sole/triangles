var THREE = require('three');
var tesselate = require('./tesselate');

var contentWidth = 320,
	contentHeight = 240;

var renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
renderer.setClearColor(new THREE.Color(0x000000), 1.0);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, contentWidth / contentHeight, 1, 100000);
var cameraTarget = new THREE.Vector3(0, 0, 0);
var cameraPosition = new THREE.Vector3(0, 0, 100);


document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResized);
onWindowResized();

var triangles = tesselate([0, 0], [100, 100], 5, 5);

console.log(triangles);

var geometry = new THREE.Geometry();
triangles.forEach(function(t) {
	t.forEach(function(tt) {
		var v = new THREE.Vector3(tt[0], tt[1], 0);
		geometry.vertices.push(v);
		console.log('boo', v.x, v.y);
	});
});
var material = new THREE.PointCloudMaterial({ color: 0xFFFF00, size: 5 });
var mesh = new THREE.PointCloud(geometry, material);
//mesh.rotation.y = Math.PI / 4;
scene.add(mesh);
console.log(material);

var debugCube = new THREE.Mesh( new THREE.BoxGeometry(10, 10, 10), new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true }) );
debugCube.scale.multiplyScalar(10);
scene.add(debugCube);
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
