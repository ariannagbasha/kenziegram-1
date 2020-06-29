import express from 'express';
import multer from 'multer';
import ejs from 'ejs';
import path from 'path';

const app = express();

app.set('view engine', 'ejs')

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'))

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`) ) 