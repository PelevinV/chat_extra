const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload())
app.use('/images', express.static('images/'))

app.post('/upload', function(req, res) {
    let uploadFile;
    let uploadPath;

    uploadFile = req.files?.picture
    uploadPath = __dirname + '/images/' + uploadFile.name;

    uploadFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err)
        res.send('/images/' + uploadFile.name)
    });
});

app.listen(3000, function() {
    return console.log('Started file uploader server on port ' + 3000);
})