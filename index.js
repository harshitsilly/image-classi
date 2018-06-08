const express = require('express');
const request =  require('request');
const bodyParser = require('body-parser');
const discoverMovie = require('./discoverMovie.js');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});

app.post('/image-classi', (req, res) => {
     
const url = req.body.conversation.memory['url'];
	 console.log(url.raw);
    var imagePath = url.raw;
    imagePath = imagePath.split("images/")[1] ? imagePath.split("images/")[1] : imagePath;
   var request_stream =  request("https://recastdocurepocorsdcinnovation.hana.ondemand.com/public/recast/my-bot-app/images/" + imagePath);
   request_stream.pipe(fs.createWriteStream("../image-classi/" + imagePath));
   request_stream.on('end', function () {
	discoverMovie(url.raw)
  .then((replies) => res.json({
    replies: replies,
  }))
  .catch((err) => console.error('movieApi::discoverMovie error: ', err));
  });
});
const pport = 5000
app.listen(pport, () => console.log(`App started on port ${pport}`));