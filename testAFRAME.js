AFRAME.registerComponent('touch-raycaster', {
    init() {
        const scene = this.el.sceneEl
        const camera = this.el.sceneEl.camera

        document.querySelector("#touch-overlay").addEventListener('click', (event) => {
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // convert to range (-1, 1)
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // convert to range (-1, 1)

            // Set the ray's origin and direction based on the camera and mouse coordinates
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // Find intersections between the ray and objects in the scene
            const intersects = raycaster.intersectObjects(scene.object3D.children);

            for (const intersect of intersects) {
                const el = intersect.object.el
                console.log('clicking on item', el)
            }
        });
    }
})