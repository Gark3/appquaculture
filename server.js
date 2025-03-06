const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Servir los archivos de la carpeta "dist"
app.use(express.static(path.join(__dirname, 'dist')));

// Para manejar rutas en SPA (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
