import * as THREE from 'three';

// --- THREE.JS SCENE SETUP ---
const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- OBJECTS ---
// Central Abstract Shape
const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 150, 20);
const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    transmission: 0.5,
    thickness: 2,
    wireframe: false
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const count = 3000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x8e8e93,
    transparent: true,
    opacity: 0.8
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// --- INTERACTION & ANIMATION ---
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;

    // Standard cursor glow update
    const glow = document.querySelector('.cursor-glow');
    if (glow) {
        glow.style.left = event.clientX + 'px';
        glow.style.top = event.clientY + 'px';
    }
});

const clock = new THREE.Clock();

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update main object
    torusKnot.rotation.x = elapsedTime * 0.2;
    torusKnot.rotation.y = elapsedTime * 0.3;

    // Smooth mouse follow
    torusKnot.position.x += (mouseX * 0.5 - torusKnot.position.x) * 0.05;
    torusKnot.position.y += (mouseY * 0.5 - torusKnot.position.y) * 0.05;

    // Particles subtle motion
    particles.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();

// --- WINDOW RESIZE ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- PARALLAX SCROLL ---
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const layers = document.querySelectorAll('.hero-layer[data-speed]');

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
});

// Reveal animation on load
document.addEventListener('DOMContentLoaded', () => {
    const revealText = document.querySelector('.reveal-text');
    if (revealText) {
        revealText.style.opacity = '0';
        revealText.style.transform = 'translateY(20px)';
        revealText.style.transition = 'all 1s ease-out';

        setTimeout(() => {
            revealText.style.opacity = '1';
            revealText.style.transform = 'translateY(0)';
        }, 100);
    }
});
