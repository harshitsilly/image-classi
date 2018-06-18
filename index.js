const express = require('express');
const request =  require('request');
const bodyParser = require('body-parser');
const proxy = require('http-proxy-middleware');
const discoverMovie = require('./discoverMovie.js');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());
// app.use('/', proxy({target: 'https://a2a9dd04.ngrok.io', changeOrigin: true}));

// Recast will send a post request to /errors to notify important errors
// described in a json body
app.post('/errors', (req, res) => {
   console.error(req.body);
   res.sendStatus(200); 
});


app.post('/listProducts', (req, res) => {
     
  const product = req.body.conversation.memory['product'];
  let replies;
     if(product.value.indexOf('vacuum') > -1)

     {
        replies = [{
          type: 'quickReplies',
          content: {
            title: 'Sorry to hear. Which type of vacuum cleaner do you have?',
            buttons: [
              {
                title: 'Cordless',
                value: 'cordless'
              },
              {
                title: 'Upright',
                value: 'upright'
              },
              {
                title: 'Canister',
                value: 'canister'
              },
              {
                title: 'Robotic',
                value: 'robotic'
              },
              {
                title: "Don't know",
                value: "Don't know"
              }

            ]
          }
        }
     ];
    }
     res.json({
      replies: replies,
    })
    
  });
app.post('/image-classi', (req, res) => {
     
const url = req.body.conversation.memory['url'];
console.log(url.raw);
    var imagePath = url.raw;
    // imagePath = imagePath.split("images/")[1] ? imagePath.split("images/")[1] : imagePath;
   var request_stream =  request(imagePath);
   imagePath = "./" + Math.random() + ".jpg";
   request_stream.pipe(fs.createWriteStream(imagePath));

   request_stream.on('end', function () {
              discoverMovie(imagePath)
  .then((replies) => {res.json({
    replies: replies
  })
  // req.body.conversation.memory.type = { 'raw' : 'upright'};
 
}
)  

  .catch((err) => console.error('movieApi::discoverMovie error: ', err));
  });
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => console.log(`App started on port` + app.get('port')));
