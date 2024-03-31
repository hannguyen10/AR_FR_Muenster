addEventListener("markerFound", function() {
    document.querySelector("#footer").innerHTML = "marker found";
});

addEventListener("markerLost", function() {
    document.querySelector("#footer").innerHTML = "marker lost";
});