import express from 'express';
import multer from 'multer';
import ejs from 'ejs';
import fs from 'fs'
import path from 'path';

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    },
    
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFitler: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

const app = express();

app.set('view engine', 'ejs')

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/; 
    //Check ext
    const extname = filetypes.test(path.extname 
        (file.originalname.toLowerCase()));
    // Check mime
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        return cb('Error: Images Only!');
    }
}

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'))
// fs.readdir(path, function(err, items) {
//     console.log(items);
//     res.send(`<h1>Welcome to Kenziegram!</h1>`);
// });

app.post('/upload', (req,res) => {
    upload(req, res, err => {
        if(err) {
            res.render('index', {
                msg: err
            });
        } else {
            res.render('index', {
                msg: 'file uploaded!',
                file:  `uploads/${req.file.filename}`
            });
        }
    })
})

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`) ) 