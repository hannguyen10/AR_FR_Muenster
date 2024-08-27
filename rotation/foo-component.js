import {ObjectControls} from './ObjectControls.js';
AFRAME.registerComponent('foo', {
    init: function () {
        var el = this.el;
        var scene = el.sceneEl;
        var camera = scene.camera;
        var renderer = scene.renderer;
        var controls;

        el.addEventListener('loaded', function () {
            var myMesh = el.getObject3D('mesh');
            controls = new ObjectControls(camera, renderer.domElement, myMesh);
            
            controls.setDistance(8, 200);
            controls.setZoomSpeed(0.5);
            controls.enableVerticalRotation();
            controls.setMaxVerticalRotationAngle(Math.PI / 4, Math.PI / 4);

            el.controls = controls;
        });
    },
    update: function () {}
});
