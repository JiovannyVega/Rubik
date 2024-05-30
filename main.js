import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { rotate } from 'three/examples/jsm/nodes/Nodes.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const loader2 = new GLTFLoader();
const geometry = new THREE.BoxGeometry(1, 1, 1); const loader = new THREE.TextureLoader();

// Asegúrate de reemplazar 'ruta/a/imagen1.png' con la ruta a tus imágenes
const textures = [
    './imagenes/Imagen1.png',
    './imagenes/descarga.gif',
    '/imagenes/images.jpg',
    './imagenes/flor.jpg',
    './imagenes/gato.png',
    './imagenes/cebolla.jpg'
].map(image => loader.load(image));

// Colores del cubo de Rubik
const colors = [0xFF0000, 0x009E60, 0x0051BA, 0xFF5800, 0xFFD500, 0xFFFFFF]; // Rojo, Verde, Azul, Naranja, Amarillo, Blanco

// Crear un material para cada cara del cubo
const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

// Crear un material para las líneas
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

// Crear una geometría de bordes a partir de la geometría del cubo
const edges = new THREE.EdgesGeometry(geometry);

// Crear un objeto LineSegments con la geometría de bordes y el material de línea
const lineSegments = new THREE.LineSegments(edges, lineMaterial);

// Crear un arreglo para almacenar todos los cubos
const cubes = [];

// Crear y añadir múltiples cubos a la escena
for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
            const cube = new THREE.Mesh(geometry, materials);
            cube.position.set(x - 1, y - 1, z - 1);

            // Añadir los segmentos de línea a cada cubo
            const lineSegmentsClone = lineSegments.clone();
            cube.add(lineSegmentsClone); // Añadir los segmentos de línea como hijos del cubo

            scene.add(cube);

            // Añadir el cubo al arreglo de cubos
            cubes.push(cube);
        }
    }
}

// Función para rotar una cara
function rotateFace(axis, direction, inverse) {
    // Filtrar los cubos que forman la cara que queremos rotar
    const faceCubes = cubes.filter(cube => cube.position[axis] === direction);

    // Crear un grupo y añadir los cubos de la cara al grupo
    const group = new THREE.Group();
    faceCubes.forEach(cube => {
        scene.remove(cube);
        group.add(cube);
    });
    scene.add(group);

    let grados = (Math.PI / 2) * -1; // 90 grados
    if (inverse)
        grados *= -1; // Rotar en sentido contrario si inverse es verdadero

    // Aplicar una rotación al grupo
    const targetRotation = group.rotation[axis] + grados;

    // Función de animación
    function animate() {
        if (Math.abs(targetRotation - group.rotation[axis]) > 0.01) {
            group.rotation[axis] += (targetRotation - group.rotation[axis]) * 0.1;
            requestAnimationFrame(animate);
        } else {
            group.rotation[axis] = targetRotation;

            // Después de la rotación, añadir los cubos de nuevo a la escena y eliminar el grupo
            faceCubes.forEach(cube => {
                group.remove(cube);
                scene.add(cube);
                cube.rotation[axis] += grados
            });
            scene.remove(group);
        }
    }

    animate();
}

// Evento keydown para rotar las caras cuando se presionan las teclas correspondientes
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'f':
            rotateFace('z', 1, false);
            break;
        case 'F':
            rotateFace('z', 1, true);
            break;
        case 'b':
            rotateFace('z', -1, false);
            break;
        case 'B':
            rotateFace('z', -1, true);
            break;
        case 'l':
            rotateFace('x', -1, false);
            break;
        case 'L':
            rotateFace('x', -1, true);
            break;
        case 'r':
            rotateFace('x', 1, false);
            break;
        case 'R':
            rotateFace('x', 1, true);
            break;
        case 'u':
            rotateFace('y', 1, false);
            break;
        case 'U':
            rotateFace('y', 1, true);
            break;
        case 'd':
            rotateFace('y', -1, false);
            break;
        case 'D':
            rotateFace('y', -1, true);
            break;
    }
});

camera.position.z = 5; // Posiciona la cámara para que los cubos estén en su campo de visión

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate(); // Inicia la animación