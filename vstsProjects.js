request = require('request');
var settings = {
    "uri": "https://atentoalm.visualstudio.com/_apis/projects?api-version=4.0",
    "method": "GET",
    "headers": {
      "Authorization": "Basic IiI6M3JjZGZobmR2c2F3dW1kNGg2aXliY3lncG14dmNtM29wNm55dG10eXFhMnhzNGxuZHl1cQ==",
    }
  }

  request(settings, function(error,response,body){
    if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body))
     }
})