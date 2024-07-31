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
		unicorn: "Titel: Einhorn auf dem Rücken eines Mannes<br>Material: Gips<br>Datierung: 1926<br>Kommentar: Originalstein noch am Münster",
		manWithBook: "Titel: Mann mit Buch<br>Material: Steinkopie<br>Datierung: 1913<br>Kommentar: Original nicht vollständig erhalten. Bei Kopie 2005 erneut leicht verändert",
		dog: "Titel: Hund<br>Material: Originalstein<br>Datierung: um 1260/70",
		horses: "Titel:Pferd<br>Material: Originalstein<br>Datierung: um 1250",
		fantasyDog: "Titel: Hundeähnliches Fantasiewesen<br>Material: Steinkopie/Originalstein<br>Datierung: Körper: unbekannt, Klauen und Beute: 1. Hälfte 16. Jh.<br>Kommentar: Modell zeigt den Zustand bis 1998 mit einem nicht datierten Körper und einem Rest des nicht vollständig erhaltenen Originals. Bei der Kopie wurde auf die Zusammenstellung verzichtet und nur der neue Teil übernommen",
		dogWithFeather: "Titel: Hundeähnliches Wesen mit Vogelfedern<br>Material: Originalstein<br>Datierung: 1. H.16.Jh.",
		monsterdog: "Titel: Monsterhund<br>Material: Originalstein<br>Datierung: 1. H.16.Jh.",
		zanner: "Titel: Akrobat 'Zanner'<br>Material: Originalstein<br>Datierung: 1. H.16.Jh.",
		skeletonHuman: "Titel: Skelettierter Mensch<br>Material: Originalstein<br>Datierung: Körper: 1. H. 16. Jh., Kopf: später<br>Kommentar: Bei der Kopie 1939 wurde der Kopf verändert",
		dogWithRabbit: "Titel: Hund mit erbeutetem Hasen<br>Material: Originalstein<br>Datierung: 1. H.16. Jh.",
		griffin: "Titel: Greif<br>Material: Originalstein<br>Datierung: 1. H.16. Jh.<br>Kommentar: Kopf später angefügt",
		fish: "Titel: Fischartiges Tier<br>Material: Originalstein<br>Datierung: 1781",
		devilry: "Titel: Teufelswesen<br>Material: Originalstein<br>Datierung: 1555",
		ram: "Titel: Widder<br>Material: Originalstein<br>Datierung: um 1270",
		billyGoat: "Titel: Ziegenbock<br>Material: Originalstein<br>Datierung: um 1270",
		manWithJug: "Titel: Mann mit Krug und Kapuzenmantel<br>Material: Gips<br>Datierung: 1914<br>Kommentar: Originalstein noch am Münster",
		knight: "Titel: Ritter 'Hochmut'<br>Material: Gips<br>Datierung: 1914<br>Kommentar: Original im Augustinermuseum",
		pig: "Titel: Schwein 'Unmäßigkeit'<br>Material: Gips<br>Datierung: 1914<br>Kommentar: Original im Augustinermuseum"
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
		// Prüfen, ob das Element bereits Text enthält
		if (!textElement.hasChildNodes()) {
			const textnode = document.createTextNode("Die Kamera wieder auf dem Marker richten, wenn sie zurückkehren möchten");
			textElement.appendChild(textnode);
		}
	});

	unpauseButton.addEventListener('click', () => {
		arSystem.unpause(); // unpause model
		const textElement = document.getElementById("text-unpause");
		// Entfernen aller Kinder des Textcontainers
		while (textElement.firstChild) {
			textElement.removeChild(textElement.firstChild);
		}
	});

	infoButton.addEventListener('click', () => {
		const infoWS = document.getElementById("infoWS");
		const close = document.getElementsByClassName("close")[0];
		const infoTextElement = document.getElementById("info-text");

		if (currentModelId && infoTexts[currentModelId]) {
			// Setzen Sie den Inhalt als HTML, damit <br> Tags interpretiert werden
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

	// arReady event triggered when ready
	sceneEl.addEventListener("arReady", (event) => {
		console.log("MindAR is ready")
	});
	// arError event triggered when something went wrong. Mostly browser compatbility issue
	sceneEl.addEventListener("arError", (event) => {
		console.log("MindAR failed to start")
	});


});