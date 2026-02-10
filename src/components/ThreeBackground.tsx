'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // --- THREE.JS SCENE SETUP ---
        const canvas = canvasRef.current;
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

        const handleMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
            mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;

            // Standard cursor glow update
            if (glowRef.current) {
                glowRef.current.style.left = event.clientX + 'px';
                glowRef.current.style.top = event.clientY + 'px';
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

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
            requestAnimationFrame(animate);
        };

        animate();

        // --- WINDOW RESIZE ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            // Optional: Dispose of Three.js objects if necessary, though React unmounting often handles DOM removal
            geometry.dispose();
            material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div className="noise-overlay"></div>
            <canvas ref={canvasRef} id="three-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -2, outline: 'none' }}></canvas>
            <div ref={glowRef} className="cursor-glow"></div>
        </>
    );
};

export default ThreeBackground;
