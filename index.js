const express = require('express');
const fs = require('fs');
const app = express();

app.listen(3000, console.log('Se ha iniciado el servidor en el puerto 3000'));

app.use(express.json());

app.post('/canciones', (req, res) => {
    const cancion = req.body;
    const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));
    repertorio.push(cancion);
    fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
    res.send('Cancion agregada correctamente');
  });

app.get('/canciones', (req, res) => {
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));
  res.json(repertorio);
});

app.delete('/canciones/:id', (req, res) => {
  const {id} = req.params;
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));
  const indice = repertorio.findIndex((i) => i.id == id);
  repertorio.splice(indice, 1);
  fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
  res.send('Canción eliminada correctamente');
});

app.put('/canciones/:id', (req, res) => {
  const modificacion = req.body;
  const {id} = req.params;
  const repertorio = JSON.parse(fs.readFileSync('repertorio.json', 'UTF-8'));
  const indice = repertorio.findIndex((i) => i.id == id);
  repertorio[indice] = modificacion;
  fs.writeFileSync('repertorio.json', JSON.stringify(repertorio));
  res.send('Cancion actualizada correctamente');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});