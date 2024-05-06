const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'html'); // Setze den Dateityp auf HTML (wenn als Vorlagen verwendet)
app.use('/static', express.static(path.join(__dirname, 'public'))); // Setze den Pfad für statische Dateien
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mindAR.html')); // Schicke die HTML-Datei
});

app.listen(8080, () => {
    console.log("Listening on http://localhost:8080");
});
