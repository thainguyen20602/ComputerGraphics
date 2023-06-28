import * as THREE from 'three'

const getAmbientLight = (color, intensity) => {
	let light = new THREE.AmbientLight(color, intensity);
	light.castShadow = true;
	return light;
};
const getSpotLight = (color, intensity) => {
	let light = new THREE.SpotLight(color, intensity);
	light.castShadow = true;
	light.shadow.bias = 0.001;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;
	return light;
};
const getDirectionalLight = (color, intensity) => {
	let light = new THREE.DirectionalLight(color, intensity);
	light.castShadow = true;
	light.shadow.camera.left = -10;
	light.shadow.camera.bottom = -10;
	light.shadow.camera.right = 10;
	light.shadow.camera.top = 10;
	return light;
};

function getPlane(size) {
	var geometry = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshPhongMaterial({
		color: "rgb(120, 120, 120)",
		side: THREE.DoubleSide,
	});
	var mesh = new THREE.Mesh(geometry, material);
	mesh.castShadow = true

	return mesh;
}

function getSphere(size) {
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: "rgb(255, 255, 255)",
	});
	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

export {
    getSphere,
    getPlane,
    getDirectionalLight,
    getSpotLight,
    getAmbientLight
}