const request =  require('request');

const axios = require('axios');
const formData = require('form-data');
const fs = require('fs');
const data = new formData();

//data.append('u_field', 'my value');
//data.append('u_data', new Buffer(10));
//data.append('u_file', fs.createReadStream('../image-classi/vacuum_cl.jpg'));

const url = `https://sandbox.api.sap.com/ml/imageclassifier/inference_sync`;

function discoverMovie(imagePath) {
  imagePath = imagePath.split("images/")[1] ? imagePath.split("images/")[1] : imagePath;
  
    // all done
    data.append("files", fs.createReadStream('../image-classi/' + imagePath));

  return axios.post(url, data, {
    headers: {
      "Accept": "application/json",
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'APIKey': 'Gca8FzlLwLQndAgOonMORa3ZgMBDGCQX'
    }
  }).then((response) => {
    //console.log(response.data.predictions[0].results[0].label);
    if (response.length === 0) {
      return [
        {
          type: 'text',
          content: 'Sorry, but I could not find any results for your request'
        },
      ];

    } else {
      return [
        {
          type: 'text',
          content: 'Hi Its ' + response.data.predictions[0].results[0].label
        }
      ];
    }

  }).catch((error) => {
    console.log(error);
  });
  
 
}



module.exports = discoverMovie;