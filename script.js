fetch("./nft-marker-files/hanako")
  .then(response => {
    if (!response.ok) {
      throw new Error("Datei nicht gefunden");
    }
    return response.text();
  })
  .then(data => {
    var nftMarker = document.querySelector("a-nft[type='nft']");
    nftMarker.setAttribute("url", "./nft-marker-files/hanako");

    // Hinzufügen eines Ereignislisteners für das markerFound-Ereignis
    nftMarker.addEventListener('markerFound', () => {
      console.log('Marker gefunden!');
    });
  })
  .catch(error => {
    console.error("Fehler beim Laden der Datei:", error);
  });
