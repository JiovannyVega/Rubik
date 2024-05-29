import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Crear un material para las líneas
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

// Crear una geometría de bordes a partir de la geometría del cubo
const edges = new THREE.EdgesGeometry(geometry);

// Crear un objeto LineSegments con la geometría de bordes y el material de línea
const lineSegments = new THREE.LineSegments(edges, lineMaterial);

// Crear y añadir múltiples cubos a la escena
for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x - 1, y - 1, z - 1);
            scene.add(cube);

            // Añadir los segmentos de línea a cada cubo
            const lineSegmentsClone = lineSegments.clone();
            lineSegmentsClone.position.set(x - 1, y - 1, z - 1);
            scene.add(lineSegmentsClone);
        }
    }
}

camera.position.z = 5; // Posiciona la cámara para que los cubos estén en su campo de visión

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate(); // Inicia la animación