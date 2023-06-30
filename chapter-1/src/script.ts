import gsap from "gsap";
import {
	AxesHelper,
	BoxGeometry,
	Clock,
	Group,
	Mesh,
	MeshBasicMaterial,
	OrthographicCamera,
	PerspectiveCamera,
	Scene,
	Vector3,
	WebGLRenderer
} from "three";

// Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement;

// Sizes
const sizes = {
	width: 1200,
	height: 800
};

const aspectRatio = sizes.width / sizes.height;

// Scene
const scene = new Scene();

const group = new Group();
scene.add(group);

// const camera = new PerspectiveCamera(100, sizes.width / sizes.height, 0.1, 100);
// camera.position.set(1, 1, 3)

const camera = new OrthographicCamera(-3 * aspectRatio, 3 * aspectRatio, 3, -3);
scene.add(camera);

const axesHelper = new AxesHelper(3);
scene.add(axesHelper)

let cursorPosition = {
	x: 0,
	y: 0
}

function updateCursorPosition(event: MouseEvent) {
	cursorPosition = {
		x: event.clientX / sizes.width,
		y: event.clientY / sizes.height
	}
}

canvas.addEventListener('mousemove', updateCursorPosition);

// Items for scene:
const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({
	color: 0xff0000
});
const cube1 = new Mesh(cubeGeometry, cubeMaterial);
cube1.position.set(-1, 0.25, 0)
group.add(cube1);

const cube2 = new Mesh(
	new BoxGeometry(),
	new MeshBasicMaterial({color: 0x00ff00})
);
cube2.position.set(1, 0, 0);
cube2.rotation.set(Math.PI, Math.PI / 4, Math.PI / 4);
group.add(cube2);

const cube3 = new Mesh(
	new BoxGeometry(),
	new MeshBasicMaterial({color: 0x0000ff})
);
cube3.position.set(2.5, 0.25, 0.5);
group.add(cube3);

// Renderer
const renderer = new WebGLRenderer({
	canvas
});
renderer.setSize(sizes.width, sizes.height);

const clock = new Clock();

gsap.to(group.position, { x: 2, y: 2, duration: 1, delay: 1});
gsap.to(group.position, { x: -2, y: -2, duration: 1, delay: 2});
gsap.to(group.position, { x: 0, y: 0, duration: 1, delay: 3});

function animate() {
	cube1.rotation.set(cube1.rotation.x + 0.01, cube1.rotation.y + 0.01, 0)

	const elapsedTime = clock.getElapsedTime();
	cube2.position.set(1, Math.sin(elapsedTime) * 2, 0)

	cube3.scale.set(Math.sin(elapsedTime), Math.cos(elapsedTime), Math.sin(elapsedTime));

	const {x, y } = cursorPosition;
	camera.position.set(Math.sin(x * 2 * Math.PI) * 3, y * 5, Math.cos(x * 2 * Math.PI) * 3);
	camera.lookAt(new Vector3());

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

animate();

