document.addEventListener("DOMContentLoaded", function () {
	const sceneEl = document.querySelector('a-scene');
	let arSystem;
	sceneEl.addEventListener('loaded', function () {
		arSystem = sceneEl.systems["mindar-image-system"];
	});

	const pauseButton = document.querySelector("#pause-button");
	const unpauseButton = document.querySelector("#unpause-button");
	const infoButton = document.querySelector("#info-button");

	const infoTexts = {
		unicorn: "<ul><h3>Einhorn auf dem Rücken eines Mannes</h3><br><li>Gips, 1926</li><br><li>Originalstein noch am Münster</li></ul>",
		manWithBook: "<ul><h3>Mann mit Buch</h3><br><li>Steinkopie, 1913</li><br><li>Original nicht vollständig erhalten. Bei Kopie 2005 erneut leicht verändert</li></ul>",
		dog: "<ul><h3>Hund</h3><br><li>Originalstein, um 1260/70</li></ul>",
		horses: "<ul><h3>Pferd</h3><br><li>Originalstein, um 1250</li></ul>",
		fantasyDog: "<ul><h3>Hundeähnliches Fantasiewesen</h3><br><li>Steinkopie/Originalstein, Körper: unbekannt, Klauen und Beute: 1. Hälfte 16. Jh.</li><br><li>Modell zeigt den Zustand bis 1998 mit einem nicht datierten Körper und einem Rest des nicht vollständig erhaltenen Originals. Bei der Kopie wurde auf die Zusammenstellung verzichtet und nur der neue Teil übernommen</li></ul>",
		dogWithFeather: "<ul><h3>Hundeähnliches Wesen mit Vogelfedern</h3><br><li>Originalstein, 1. H.16.Jh.</li></ul>",
		monsterdog: "<ul><h3>Monsterhund</h3><br><li>Originalstein, 1. H.16.Jh.</li></ul>",
		zanner: "<ul><h3>Akrobat 'Zanner'</h3><br><li>Originalstein, 1. H.16.Jh.</li></ul>",
		skeletonHuman: "<ul><h3>Skelettierter Mensch</h3><br><li>Originalstein, Körper: 1. H. 16. Jh., Kopf: später</li><br><li>Bei der Kopie 1939 wurde der Kopf verändert</li></ul>",
		dogWithRabbit: "<ul><h3>Hund mit erbeutetem Hasen</h3><br><li>Originalstein, 1. H.16. Jh.</li></ul>",
		griffin: "<ul><h3>Greif</h3><br><li>Originalstein, 1. H.16. Jh.</li><br><li>Kopf später angefügt</li></ul>",
		fish: "<ul><h3>Fischartiges Tier</h3><br><li>Originalstein, 1781</li></ul>",
		devilry: "<ul><h3>Teufelswesen</h3><br><li>Originalstein, 1555</li></ul>",
		ram: "<ul><h3>Widder</h3><br><li>Originalstein, um 1270</li></ul>",
		billyGoat: "<ul><h3>Ziegenbock</h3><br><li>Originalstein, um 1270</li></ul>",
		manWithJug: "<ul><h3>Mann mit Krug und Kapuzenmantel</h3><br><li>Gips, 1914</li><br><li>Originalstein noch am Münster</li></ul>",
		knight: "<ul><h3>Ritter 'Hochmut'</h3><br><li>Gips, 1914</li><br><li>Original im Augustinermuseum</li></ul>",
		pig: "<ul><h3>Schwein 'Unmäßigkeit'</h3><br><li>Gips, 1914</li><br><li>Original im Augustinermuseum</li></ul>"
	};

	let currentModelId = "";

	sceneEl.addEventListener('targetFound', (event) => {
		const targetEntity = event.target;
		if (targetEntity) {
			const gltfModel = targetEntity.querySelector('a-gltf-model');
			if (gltfModel) {
				currentModelId = gltfModel.getAttribute('src').substring(1);
				console.log("Current model ID:", currentModelId);
			} else {
				console.log("No GLTF model found for target entity.");
			}
		} else {
			console.log("No target entity found.");
		}
	});


	pauseButton.addEventListener('click', () => {
		arSystem.pause(true); // pause model
		const textElement = document.getElementById("text-unpause");

		// check whether the element already contains text
		if (!textElement.hasChildNodes()) {
			const textnode = document.createTextNode("Richten Sie die Kamera wieder auf dem Marker, um Zurückzukehren.");
			textElement.appendChild(textnode);
		}
	});

	unpauseButton.addEventListener('click', () => {
		arSystem.unpause(); // unpause model
		const textElement = document.getElementById("text-unpause");

		// remove all children of the text container
		while (textElement.firstChild) {
			textElement.removeChild(textElement.firstChild);
		}
	});

	infoButton.addEventListener('click', () => {
		const infoWS = document.getElementById("infoWS");
		const close = document.getElementsByClassName("close")[0];
		const infoTextElement = document.getElementById("info-text");

		if (currentModelId && infoTexts[currentModelId]) {
			// set the content as HTML so that HTML tags are interpreted
			infoTextElement.innerHTML = infoTexts[currentModelId];
			infoTextElement.className = `info-text ${currentModelId}`;
		} else {
			infoTextElement.innerHTML = "Scannen Sie die Marker, um mehr Informationen über die Wasserspeier zu kriegen";
			infoTextElement.className = "info-text";
		}

		infoWS.style.display = "block";

		close.onclick = function () {
			infoWS.style.display = "none";
		}

		window.onclick = function (event) {
			if (event.target == infoWS) {
				infoWS.style.display = "none";
			}
		}
	});


	sceneEl.addEventListener("arReady", (event) => {
		console.log("MindAR is ready")
	});

	sceneEl.addEventListener("arError", (event) => {
		console.log("MindAR failed to start")
	});


});