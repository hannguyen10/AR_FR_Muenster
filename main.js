//import * as THREE from 'three';

document.addEventListener("DOMContentLoaded", function() {
	const sceneEl = document.querySelector('a-scene');
	let arSystem;
	sceneEl.addEventListener('loaded', function () {
	  arSystem = sceneEl.systems["mindar-image-system"];
	});

	const pauseButton = document.querySelector("#pause-button");
	const unpauseButton = document.querySelector("#unpause-button");


	pauseButton.addEventListener('click', () => {
    arSystem.pause(true); // pause AR, keep video
    const textElement = document.getElementById("text-unpause");
    // Prüfen, ob das Element bereits Text enthält
    if (!textElement.hasChildNodes()) {
        const textnode = document.createTextNode("Beim unpausieren die Kamera auf den Marker wieder richten");
        textElement.appendChild(textnode);
    }
  });

	unpauseButton.addEventListener('click', () => {
	  arSystem.unpause(); // unpause AR and video
    const textElement = document.getElementById("text-unpause");
    // Entfernen aller Kinder des Textcontainers
    while (textElement.firstChild) {
        textElement.removeChild(textElement.firstChild);
    }
	});

  // arReady event triggered when ready
	sceneEl.addEventListener("arReady", (event) => {
	  console.log("MindAR is ready")
	});
	// arError event triggered when something went wrong. Mostly browser compatbility issue
	sceneEl.addEventListener("arError", (event) => {
	  console.log("MindAR failed to start")
	});
});