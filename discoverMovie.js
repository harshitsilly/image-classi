const request =  require('request');

const axios = require('axios');
const formData = require('form-data');
const fs = require('fs');

//data.append('u_field', 'my value');
//data.append('u_data', new Buffer(10));
//data.append('u_file', fs.createReadStream('../image-classi/vacuum_cl.jpg'));

function discoverMovie(imagePath) {
// let url = `https://sandbox.api.sap.com/ml/imageclassifier/inference_sync`;
let url = `https://mlfinternalproduction-image-classifier.cfapps.sap.hana.ondemand.com/api/v2/image/classification/models/vc_type/versions/1`;
  let data = new formData();
  imagePath = imagePath.split("images/")[1] ? imagePath.split("images/")[1] : imagePath;
  
    // all done
    data.append("files", fs.createReadStream(imagePath));

  return axios.post(url, data, {
    headers: {
      "Accept": "application/json",
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      'Authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtleS1pZC0xIn0.eyJqdGkiOiIwZjA3ZDYzOWM4MTU0NzQ1YjYxMDM0NDE2OGY4NjI4MCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJ6ZG4iOiJiZC1mZWxsb3ciLCJzZXJ2aWNlaW5zdGFuY2VpZCI6ImI5MmVkMDI4LTczZTMtNGYwMi04NzZlLTMwZjVlZGZlYzU4YyJ9LCJzdWIiOiJzYi1iOTJlZDAyOC03M2UzLTRmMDItODc2ZS0zMGY1ZWRmZWM1OGMhYjIzNDR8bWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMyIsImF1dGhvcml0aWVzIjpbIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMuc3RvcmFnZWFwaS5hbGwiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVsZGVwbG95bWVudC5hbGwiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLnJldHJhaW5zZXJ2aWNlLnJlYWQiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVsc2VydmljZS5yZWFkIiwidWFhLnJlc291cmNlIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbHJlcG8ud3JpdGUiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVscmVwby5yZWFkIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbG1ldGVyaW5nLnJlYWQiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLnJldHJhaW5zZXJ2aWNlLndyaXRlIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5pbmZlcmVuY2UiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLmZ1bmN0aW9uYWxzZXJ2aWNlLmFsbCIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMuam9iYXBpLmFsbCJdLCJzY29wZSI6WyJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLnN0b3JhZ2VhcGkuYWxsIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbGRlcGxveW1lbnQuYWxsIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5yZXRyYWluc2VydmljZS5yZWFkIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbHNlcnZpY2UucmVhZCIsInVhYS5yZXNvdXJjZSIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMubW9kZWxyZXBvLndyaXRlIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbHJlcG8ucmVhZCIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMubW9kZWxtZXRlcmluZy5yZWFkIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5yZXRyYWluc2VydmljZS53cml0ZSIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMuaW5mZXJlbmNlIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5mdW5jdGlvbmFsc2VydmljZS5hbGwiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLmpvYmFwaS5hbGwiXSwiY2xpZW50X2lkIjoic2ItYjkyZWQwMjgtNzNlMy00ZjAyLTg3NmUtMzBmNWVkZmVjNThjIWIyMzQ0fG1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMiLCJjaWQiOiJzYi1iOTJlZDAyOC03M2UzLTRmMDItODc2ZS0zMGY1ZWRmZWM1OGMhYjIzNDR8bWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMyIsImF6cCI6InNiLWI5MmVkMDI4LTczZTMtNGYwMi04NzZlLTMwZjVlZGZlYzU4YyFiMjM0NHxtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiI4MTk0MDBmZiIsImlhdCI6MTUyOTMwMTE5NywiZXhwIjoxNTI5MzQ0Mzk3LCJpc3MiOiJodHRwOi8vYmQtZmVsbG93LmxvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6ImY1MGE0NTdhLWQ4M2QtNDJhMC05Mjk4LWJjOGYyNDM3MjI2YiIsImF1ZCI6WyJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVsbWV0ZXJpbmciLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLmpvYmFwaSIsInVhYSIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMuZnVuY3Rpb25hbHNlcnZpY2UiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLnJldHJhaW5zZXJ2aWNlIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5zdG9yYWdlYXBpIiwibWwtZm91bmRhdGlvbi14c3VhYS1zdGQhYjMxMy5tb2RlbGRlcGxveW1lbnQiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVsc2VydmljZSIsIm1sLWZvdW5kYXRpb24teHN1YWEtc3RkIWIzMTMiLCJtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzLm1vZGVscmVwbyIsInNiLWI5MmVkMDI4LTczZTMtNGYwMi04NzZlLTMwZjVlZGZlYzU4YyFiMjM0NHxtbC1mb3VuZGF0aW9uLXhzdWFhLXN0ZCFiMzEzIl19.jHoQj90aB_Rvc9UgLmNqbiZZNPFaMUsMVu2yxnXMLpJVTzORIFZRUM5lt6u2y9GV1D0Wh1WzNsz-RTfkV8Ls9xa_HUAoQD0gC-ZbOCpmIvkGkO3ZfIhgniAkHSBwr98Wt3i6sKWwadA1RcE26PDxV9icH6eR3J6etN7AGhA26Jr1VbN9k9TBTjZsffV7ab4QpSiuTcEgbUVsplv11YJaESdRvYYATIn-BxzdHBhOv158dosCKBf8qEV6aG5WgezcDUwixrawUbmE5WkH1HPfqQYgYv-cYwyg5hGKoEHPscPt83Wgwe9lRO05geSkvZwBv94HtksSLGimIlPbmY4c6A'
      //'APIKey': 'Gca8FzlLwLQndAgOonMORa3ZgMBDGCQX'
    }
  }).then((response) => {   
    if (response.length === 0) {
      return [
        {
          type: 'text',
          content: 'Sorry, but could you please upload the photo again?'
        },
      ];

    } else {
      let str = response.data.predictions[0].results[0].label;


      if(str.indexOf('Robotic') > -1 || str.indexOf('Cordless') > -1|| str.indexOf('Canister') > -1 || str.indexOf('Upright') > -1) {
        
        return [
          {
            type: 'text',
            content: 'Ok, thank you. It is' + str
          },
          {
            type: 'text',
            content: 'Could you now please upload a photo of the broken part.'
          }
        ];
      } 
       else {
        let val = str.split(",")[1] ?str.split(",")[1] : str;
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
  
 
};




module.exports = discoverMovie;
