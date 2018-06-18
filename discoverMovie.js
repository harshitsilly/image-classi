const request =  require('request');

const axios = require('axios');
const formData = require('form-data');
const fs = require('fs');


//data.append('u_field', 'my value');
//data.append('u_data', new Buffer(10));
//data.append('u_file', fs.createReadStream('../image-classi/vacuum_cl.jpg'));

const url = `https://sandbox.api.sap.com/ml/imageclassifier/inference_sync`;

function discoverMovie(imagePath) {
  // imagePath = imagePath.split("images/")[1] ? imagePath.split("images/")[1] : imagePath;
  
    // all done
    const data = new formData();
    data.append("files", fs.createReadStream(imagePath));

  return axios.post(url, data, {
    headers: {
      "Accept": "application/json",
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'APIKey': 'Gca8FzlLwLQndAgOonMORa3ZgMBDGCQX'
    }
  }).then((response) => {
    let str = response.data.predictions[0].results[0].label;
    let val = str.split(",")[1] ?str.split(",")[1] : str;
    if (response.length === 0) {
      return [
        {
          type: 'text',
          content: 'Sorry, but could you please upload the photo again?'
        },
      ];

    } else {

      if(str.indexOf('vacuum') > -1) {
        return [
          {
            type: 'text',
            content: 'ok thank you, its upright' + val
          },
          {
            type: 'text',
            content: 'I am still working on identifying the the broken part.'
          }
        ];
      } else {
        return [
          {
            type: 'text',
            content: 'Looks like ' + val
          },
          {
            type: 'text',
            content: 'Can you please upload a photo again?'
          }
        ];
      }
     
    }


  }).catch((error) => {
    console.log(error);
  });
  
 
}



module.exports = discoverMovie;