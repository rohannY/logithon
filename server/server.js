const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/logithon', upload.single('csv_file'), (req, res) => {
    // Rename uploaded file to input.csv
    fs.rename(req.file.path, 'input.csv', (err) => {
        if (err) throw err;
        console.log('File uploaded and moved!');
        
        // Call Python script
        PythonShell.run('logithon.py', null, (err) => {
            if (err) throw err;
            console.log('Python script finished!');
            
            // Send generated image to client
            res.sendFile('output_image.png', { root: './' }, (err) => {
                if (err) throw err;
                console.log('Image sent to client!');
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
