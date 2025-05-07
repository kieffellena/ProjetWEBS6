//configuration serveur Express, définition middlewares,
//déclaration routes pour gérer les pages et interactions

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './routes/index.js';
import randoRoutes from './routes/randonnee.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());

//routes
app.use('/', indexRoutes);
app.use('/randonnee', randoRoutes);

app.post('/ajouter-randonnee', (req, res) => {
  const { name, adress } = req.body;

  //pr tester
  console.log("Nom :", name);
  console.log("Adresse :", adress);
  console.log('rando check');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});