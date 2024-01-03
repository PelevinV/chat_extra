const livekitApi = require('livekit-server-sdk');
const AccessToken = livekitApi.AccessToken;
const express = require('express');
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

app.get('/getToken', (req, res) => {
  res.send(createToken(req.query.room, req.query.identity, req.query.name, req.query.metadata,));
});

app.listen(5000, function() {
    return console.log('Started access_token server on port ' + 5000);
})