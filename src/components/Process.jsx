import React, { Component } from "react";
import * as THREE from "three";

import TransformControls from "../source/TransformControls.js";
import { TeapotGeometry } from "../source/TeapotGeometry.js";

import particle from '../assets/textures/lightBlue.jpg'
import Doraemon from "../assets/textures/Doraemon.jpg"
import Brich from "../assets/textures/brich.jpg"
import Cement from "../assets/textures/cement.jpg"

import {
	getSphere,
	getPlane,
	getDirectionalLight,
	getSpotLight,
	getAmbientLight
} from './misc/utils.jsx'
import CustomSinCurve from './misc/CustomSinCurve.jsx'

export default class Process extends Component {
	constructor(props) {
		super(props);
		this.OrbitControls = require("three-orbit-controls")(THREE);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.animate = this.animate.bind(this);
		this.state = {
			position: {
				x: 0,
				y: 0,
				z: 0,
			},
			rotation: {
				x: 0,
				y: 0,
				z: 0,
			},
			scale: {
				x: 3,
				y: 3,
				z: 3,
			},
		};
		this.path = new CustomSinCurve(0.8);
		this.flagy = false;
		this.flagz = false;
	}
	// FUNCTION FOR SAVE VALUES FORM INPUTS
	stateUpdate = (event, direction, axis, ajustFunc) => {
		// CHANGING EVENT TO MOUSE DATA IF...
		const targetValue = typeof event === "number" ? event : event.target.value;
		const isNum = targetValue === "" ? "" : Number(targetValue);
		this.setState(
			(state) => {
				return (state[direction] = {
					...state[direction],
					[axis]: isNum,
				});
			},
			() => ajustFunc(direction, axis)
		);
	};
	componentDidMount() {
		const width = this.mount.clientWidth;
		const height = this.mount.clientHeight;
		this.OrbitControls = require("three-orbit-controls")(THREE);
		const scene = new THREE.Scene();


		// const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
		var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
		});
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({
			color: this.props.data.colorObject,
		});
		this.plane = getPlane(20);
		const cube = new THREE.Mesh(geometry, material);
		const size = 10;
		const divisions = 25;
		// GRID helper
		this.gridHelper = new THREE.GridHelper(size, divisions);
		cube.position.y = cube.geometry.parameters.height / 2;
		this.plane.rotation.x = Math.PI / 2;
		const light = new THREE.PointLight(0xffffff, 1);
		light.position.y = 1;
		camera.position.x = 1;
		camera.position.y = 2;
		camera.position.z = 5;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		scene.add(cube);
		scene.add(light);
		scene.add(this.plane);
		scene.add(this.gridHelper);
		renderer.setClearColor("rgb(120, 120, 120)");
		renderer.setSize(width, height);
		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.material = material;
		this.cube = cube;

		this.control = new TransformControls(this.camera, this.renderer.domElement);
		this.control.addEventListener("change", () => {
			this.renderer.render(this.scene, this.camera);
		});
		this.control.setSize(1);

		// EVENT LISTNER TO DISABLE ORBIT MOVE
		this.control.addEventListener("dragging-changed", (event) => {
			// this.updateSetState();
			this.control.setMode("translate");
			this.orbit.enabled = !event.value;
		});
		// ORBIT CONTROL
		this.orbit = new this.OrbitControls(this.camera, this.renderer.domElement);
		this.camera.position.set(0, 2, 2);
		this.orbit.update();
		//EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
		this.orbit.addEventListener("change", () =>
			this.renderer.render(this.scene, this.camera)
		);
		// ATTACH MODEL TO TRANSFORM CONTROL
		this.control.attach(this.cube);
		this.scene.add(this.control);
		this.orbit.update();
		this.mount.appendChild(this.renderer.domElement);
		// this.start();
	}
	// UPDATE REACT STATE AND INPUT VALUE
	updateSetState = () => {
		if (this.gltf !== undefined) {
			this.setState((state) => {
				const gltf = this.gltf[this.valType.value];
				return (state[this.valType.value] = {
					x: gltf.x,
					y: gltf.y,
					z: gltf.z,
				});
			});
		}
	};
	componentDidUpdate(prevProps, prevState) {

		console.log("this.props.initialDatState", this.props.data.string);
		this.scene = new THREE.Scene();
		var plane = getPlane(20);
		plane.rotation.x = Math.PI / 2;
		this.scene.add(plane);
		var sphere = getSphere(0.05);
		var size = 0.5;
		var segmentMultiplier = 1;
		var geometry;
		var material;
		var light;
		switch (this.props.geometry) {
			case "box":
				geometry = new THREE.BoxGeometry(size, size, size);
				break;
			case "sphere":
				geometry = new THREE.SphereGeometry(
					size,
					32 * segmentMultiplier,
					32 * segmentMultiplier
				);
				break;
			case "cone":
				geometry = new THREE.ConeGeometry(size, size, 256 * segmentMultiplier);
				break;
			case "cylinder":
				console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
				break;
			case "torus":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
				break;
			case "torusknot":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.TorusKnotGeometry(0.5, 0.1, 100, 16);
				break;
			case "tube":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.TubeGeometry(this.path, 100, 0.1, 20, false);
				break;
			case "teapot":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new TeapotGeometry(0.5, 0.5, true, true, true, false, true);
				break;
			case "circleGeometry":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.CircleGeometry(0.5, 32);
				break;
			case "ringGeometry":
				// console.log("this.props.geometry:", this.props.geometry);
				geometry = new THREE.RingGeometry( 0.3, 0.5, 32 ); 
				
				break;
			default:
				break;
		}
		switch (this.props.surface) {
			case "point":
				material = new THREE.PointsMaterial({
					color: this.props.data.colorObject,
					size: 0.05,
				});
				break;
			case "line":
				material = new THREE.MeshNormalMaterial({
					color: this.props.data.colorObject,
					transparent: true,
					opacity: 1,
					wireframe: true,
					wireframeLinewidth: 2,
					wireframeLinejoin: "round",
					wireframeLinecap: "round",
				});
				break;
			case "phong":
				material = new THREE.MeshPhongMaterial({
					color: this.props.data.colorObject,
				});
				break;
			case "lambert":
				material = new THREE.MeshLambertMaterial({
					color: this.props.data.colorObject,
				});
				break;
			case "standard":
				material = new THREE.MeshStandardMaterial({
					color: this.props.data.colorObject,
				});
				break;
			case "brich":
				var texture = new THREE.TextureLoader().load(Brich);
				this.geometry = new THREE.BoxBufferGeometry(200, 200, 200);
				material = new THREE.MeshBasicMaterial({ map: texture });
				break;
			case "particle":
				var texture = new THREE.TextureLoader().load(particle);
				this.geometry = new THREE.BoxBufferGeometry(200, 200, 200);
				material = new THREE.MeshBasicMaterial({ map: texture });
				break;
			case "cement":
				var texture = new THREE.TextureLoader().load(Cement);
				this.geometry = new THREE.BoxBufferGeometry(200, 200, 200);
				material = new THREE.MeshBasicMaterial({ map: texture });
				break;
			case "doraemon":
				var texture = new THREE.TextureLoader().load(Doraemon);
				this.geometry = new THREE.BoxBufferGeometry(200, 200, 200);
				material = new THREE.MeshBasicMaterial({ map: texture });
				break;
			default:
				material = new THREE.MeshBasicMaterial({
					color: this.props.data.colorObject,

				});
				break;
		}

		switch (this.props.light) {
			case "point":
				light = new THREE.PointLight(this.props.data.colorLight, 1);
				light.add(sphere);
				break;
			case "ambient":
				light = getAmbientLight(this.props.data.colorLight, 0.5);
				break;
			case "spot":
				light = getSpotLight(this.props.data.colorLight, 1);

				light.castShadow = true
				// light.penumbra = 0.5
				break;
			case "directional":
				light = getDirectionalLight(this.props.data.colorLight, 0.5);

				break;
			case "remove":
				// geometry = this.props.geometry;
				this.scene.children.forEach(function (e) {
					if (e.name == "Light") {
						this.scene.remove(e);
					}
				});
				break;
			default:
				break;
		}
		if (this.props.surface == "point") {
			this.cube = new THREE.Points(geometry, material);
		} else {
			this.cube = new THREE.Mesh(geometry, material);
		}
		if (this.props.light != "remove") {
			light.name = "Light";
			light.position.y = this.props.data.lightPosition;
		}
		this.cube.position.y = 1;
		// this.cube = new THREE.Points(geometry, material );
		this.camera.fov = this.props.data.fov;
		this.camera.near = this.props.data.near;
		this.camera.far = this.props.data.far;
		this.camera.updateProjectionMatrix();
		this.scene.add(this.cube);

		this.scene.add(light);
		this.scene.add(this.gridHelper);
		this.control.addEventListener("change", () => {
			this.renderer.render(this.scene, this.camera);
		});
		this.control.setSize(1);
		// EVENT LISTNER TO DISABLE ORBIT MOVE
		this.control.addEventListener("dragging-changed", (event) => {
			// this.updateSetState();
			this.control.setMode(this.props.data.objectTransform);
			this.orbit.enabled = !event.value;
		});
		// ORBIT CONTROL
		this.camera.position.set(0, 2, 2);
		this.orbit.update();
		//EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
		this.orbit.addEventListener("change", () =>
			this.renderer.render(this.scene, this.camera)
		);
		// ATTACH MODEL TO TRANSFORM CONTROL
		this.control.attach(this.cube);
		this.scene.add(this.control);
		this.orbit.update();
		this.renderer.render(this.scene, this.camera);
		// console.log(this.props.animation );
		if (this.props.animation === "remove") {
			this.stop();
			console.log(this.props.animation);
		} else {
			this.start();
		}
	}
	componentWillUnmount() {
		this.stop();
		this.mount.removeChild(this.renderer.domElement);
	}
	start() {
		this.frameId = requestAnimationFrame(this.animate);
	}
	stop() {
		cancelAnimationFrame(this.frameId);
	}
	animate() {
		switch (this.props.animation) {
			case "animation: Ox":
				this.cube.rotation.x += 0.02;
				break;
			case "animation: Oy":
				this.cube.rotation.y += 0.02;
				break;
			case "animation: Oz":
				this.cube.rotation.z += 0.02;
				break;
			case "animation: translation y":
				if (this.cube.position.y < 3 && this.flagy === false) {
					this.cube.position.y += 0.005;
				} else if (this.cube.position.y >= 3) {
					this.flagy = true;
				}
				if (this.cube.position.y > 1 && this.flagy === true) {
					this.cube.position.y -= 0.005;
				} else if (this.cube.position.y <= 1) {
					this.flagy = false;
				}
				this.cube.rotation.x += 0.005;
				this.cube.rotation.y += 0.005;
				this.cube.rotation.z += 0.005;
				break;
			case "animation: translation x":
				if (this.cube.position.x < 2 && this.flagx === false) {
					this.cube.position.x += 0.005;
				} else if (this.cube.position.x >= 2) {
					this.flagx = true;
				}
				if (this.cube.position.x > -2 && this.flagx === true) {
					this.cube.position.x -= 0.005;
				} else if (this.cube.position.x <= 1) {
					this.flagx = false;
				}
				this.cube.rotation.z += 0.05;
				// this.cube.rotation.y += 0.05;
				// this.cube.rotation.z += 0.05;
				break;
			default:
				break;
		}
		this.renderScene();
		this.frameId = window.requestAnimationFrame(this.animate);
	}
	renderScene() {
		this.renderer.render(this.scene, this.camera);
		// this.controls.update();
	}
	render() {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
				}}
				ref={(mount) => {
					this.mount = mount;
				}}
			/>
		);
	}
}

