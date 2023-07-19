import {
	AxesHelper,
	BufferAttribute,
	BufferGeometry, Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer
} from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import gsap from 'gsap';
import dat from "dat.gui";

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
};

// Scene
const scene = new Scene();

const materialParams = {
	color: 0xff0000,
	wireframe: true
}

// Object
const positionsArray = new Float32Array([
	0, 0, 0,
	0, 1, 0,
	1, 0, 0
]);
const positionsAttribute = new BufferAttribute(positionsArray, 3);
const geometry = new BufferGeometry();
geometry.setAttribute('position', positionsAttribute);
const material = new MeshBasicMaterial(materialParams);
const mesh = new Mesh(
	geometry,
	material
);
mesh.position.set(1, 0, 1);
scene.add(mesh);

const count = 50;
const size = count * 3;
const crazyPositionsArray = new Float32Array(size)
for (let i = 0; i < size; i++) {
	crazyPositionsArray[i] = Math.random() * 0.5;
}
const crazyPositionsAttribute = new BufferAttribute(crazyPositionsArray, 3);
const secondaryGeometry = new BufferGeometry();
secondaryGeometry.setAttribute('position', crazyPositionsAttribute);
const crazyMesh = new Mesh(
	secondaryGeometry,
	material
);
crazyMesh.position.set(1, 0, -1);
scene.add(crazyMesh);

const axesHelper = new AxesHelper(3);
scene.add(axesHelper);

// Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(1, 1, 3)
scene.add(camera);

const orbitControls = new OrbitControls(camera, canvas)

// Renderer
const renderer = new WebGLRenderer({
	canvas
});
renderer.setSize(sizes.width, sizes.height);

function animate() {
	orbitControls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
}

animate()

// debug controls:

const actions = {
	spin: () => {
		gsap.to(crazyMesh.rotation, {y: crazyMesh.rotation.y + 2 * Math.PI})
	}
};

gui.add(mesh.position, 'y', -5, 5, 0.01)
	.name('mesh.position.y');

gui.add(mesh.material, 'wireframe')
	.name('mesh.material.wireframe');

gui.add(crazyMesh.rotation, 'y', -Math.PI, Math.PI, 0.05)
	.name('mesh.rotation.y');

gui.addColor(materialParams, 'color')
	.onChange(() => material.color.set(materialParams.color));

gui.add(actions, 'spin');