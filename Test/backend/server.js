const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
  db.query('INSERT INTO images (path) VALUES (?)', [imagePath], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Image uploaded!', path: imagePath });
  });
});

app.get('/images', (req, res) => {
    db.query('SELECT * FROM images', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });
  

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
