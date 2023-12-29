const livekitApi = require('livekit-server-sdk');
const AccessToken = livekitApi.AccessToken;
const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const createToken = (room, identity, name, metadata) => {

  const at = new AccessToken('process.env.LK_API_KEY', 'process.env.LK_API_SECRET', {
    identity: identity,
    name: name,
    metadata: metadata
  });
  at.addGrant({ roomJoin: true, room: room });

  return at.toJwt();
}

const app = express();

app.use(fileUpload())
app.use('/images', express.static('images/'))

app.get('/getToken', (req, res) => {
  res.send(createToken(req.query.room, req.query.identity, req.query.name, req.query.metadata,));
});

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