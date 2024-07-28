//import * as THREE from 'three';
//import { ObjectControls } from 'threeJS-object-controls';
//import { MindARThree } from 'mindar-image-three';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Initialisierung von MindAR
window.addEventListener('load', () => {
    // Initialisierung von MindAR
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector("#ar-container"),
        imageTargetSrc: './mindar-project/mind_files/WS_all_Marker2.mind',
    });

const {renderer, scene, camera} = mindarThree;

// Laden eines 3D-Objekts
const loader = new THREE.GLTFLoader();
let model;
loader.load('./models/WS05.gltv', function(gltf) {
    model = gltf.scene;
    scene.add(model);
});

// Render-Schleife
const animate = () => {
    requestAnimationFrame(animate);

    // Drehe das 3D-Modell, wenn es geladen ist
    if (model) {
        model.rotation.y += 0.01; // Beispiel: Rotation um die y-Achse
    }

    renderer.render(scene, camera);
};

// Starte die AR-Erfahrung
mindarThree.start();
animate();

// Rotation durch Mausbewegungen
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };

document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
    if (isMouseDown && model) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        model.rotation.y += deltaMove.x * 0.005;
        model.rotation.x += deltaMove.y * 0.005;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }
});




    /*function init() {
        var controls = new ObjectControls(camera, renderer.domElement, myMesh);
        controls.setDistance(8, 200); // set min - max distance for zoom
        controls.setZoomSpeed(0.5); // set zoom speed
        controls.enableVerticalRotation();
        controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);
        controls.setRotationSpeed(0.05);
    }
    init();*/
})
