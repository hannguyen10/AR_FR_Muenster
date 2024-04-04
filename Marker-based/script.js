fetch("Marker-based/test_Hanako")
  .then(response => {
    if (!response.ok) {
      throw new Error("Datei nicht gefunden");
    }
    return response.text();
  })
  .then(data => {
    // Hier wird die Datei erfolgreich geladen
    // Setze den Inhalt der Datei als URL für den NFT-Marker
    var nftMarker = document.querySelector("a-nft[type='nft']");
    nftMarker.setAttribute("url", "Marker-based/test_Hanako");
  })
  .catch(error => {
    console.error("Fehler beim Laden der Datei:", error);
  });
