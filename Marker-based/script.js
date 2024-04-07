fetch("hanako")
  .then(response => {
    if (!response.ok) {
      throw new Error("Datei nicht gefunden");
    }
    return response.text();
  })
  .then(data => {
    var nftMarker = document.querySelector("a-nft[type='nft']");
    nftMarker.setAttribute("url", "hanako");
  })
  .catch(error => {
    console.error("Fehler beim Laden der Datei:", error);
  });
