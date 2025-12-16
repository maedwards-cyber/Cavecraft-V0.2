// main.js

// Grab the canvas from the page
const canvas = document.getElementById('cavecraft-canvas');

// Create renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // sky blue

const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 2, 5); // x, y, z

// Simple directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Test cube so we can see something
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Basic camera movement (WASD)
const keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

function updateCamera(delta) {
  const speed = 5; // units per second

  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.y = 0;
  forward.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(forward, new THREE.Vector3(0, 1, 0)).negate().normalize();

  if (keys['w']) {
    camera.position.addScaledVector(forward, speed * delta);
  }
  if (keys['s']) {
    camera.position.addScaledVector(forward, -speed * delta);
  }
  if (keys['a']) {
    camera.position.addScaledVector(right, -speed * delta);
  }
  if (keys['d']) {
    camera.position.addScaledVector(right, speed * delta);
  }
}

// Handle resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

let lastTime = performance.now();

function animate(time) {
  requestAnimationFrame(animate);

  const delta = (time - lastTime) / 1000; // seconds
  lastTime = time;

  // Rotate cube just so we see motion
  cube.rotation.y += 0.5 * delta;

  updateCamera(delta);

  renderer.render(scene, camera);
}

animate(lastTime);
