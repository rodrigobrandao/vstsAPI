var request = require('request');

var authorization = "Basic xxxxxx"
var urlBase = "https://atentoalm.visualstudio.com/AtentoBR/_apis/wit";

async function workItemAdd(workitem) {
            
  var data = [
    {
      "op": "add",
      "path": "/fields/System.Title",
      "from": null,    
      "value": workitem.Title
    },  
    {
      "op": "add",
      "path": "/fields/System.AreaPath",
      "value": workitem.AreaPath
    },
    {
      "op": "add",
      "path": "/fields/System.IterationPath",
      "value": workitem.IterationPath
    },
    {
      "op": "add",
      "path": "/fields/System.Description",
      "value": workitem.Description
    },
    {
      "op": "add",
      "path": "/fields/System.AssignedTo",
      "value": workitem.AssignedTo
    },
    {
        "op": "add",
        "path": "/fields/System.Tags",
        "value": "API"
      }
  ]
        
  var options = {
      "uri": urlBase + "/workitems/$Requirement?api-version=4.0",
      "method": "POST",
      "headers": {
        "Authorization": authorization,
        'Content-Type': "application/json-patch+json; charset=utf-8"
      },      
      "body":JSON.stringify(data) 
    }

    return handlerPromise(options);         
}

async function workItemUpd(workitemId) {
    
  var data = [
    {
      "op": "add",
      "path": "/fields/System.Title",
      "value": "ae"
    },
    {
      "op": "add",
      "path": "/fields/System.History",
      "value": "Moving to the right area path"
    }
  ]
    
  var options = {
    "uri": urlBase + "/workitems/"+ workitemId +"?api-version=4.0",
      "method": "PATCH",
      "headers": {
        "Authorization": authorization,
        'Content-Type': "application/json-patch+json; charset=utf-8"
      },              
      "body":JSON.stringify(data) 
    }
            
    return handlerPromise(options);
}

async function workItemDel(workitemId) {
    
  var options = {
    "uri": urlBase + "/workitems/"+ workitemId +"?api-version=4.0",
    "method": "DELETE",
    "headers": 
    {
      "Authorization": authorization
    }
  }
  
  return handlerPromise(options);
}

async function attachmentAdd(){
              
  var texto = "este eh o conteudo do arquivo";
  var options = {
    "uri": urlBase + "/attachments?fileName=anexoViaAPI.txt&api-version=4.1",
    "method": "POST",
    "headers": {
      "Authorization": authorization,
      'Content-Type': "application/json-patch+json; charset=utf-8"
    },              
    "body": JSON.stringify(texto)
  } 
  
  return handlerPromise(options);
}

async function workItemAtt(workitem) {
  
  var data =[ 
  {
    "op": "add",
    "path": "/fields/System.History",
    "value": "Adicionado um anexo"
  },    
  {
    "op": "add",
    "path": "/relations/-",
    "value": {
        "rel": "AttachedFile",
        "url": workitem.url,
        "attributes": {"comment": "meu comentario"}
      }
  }]
                
  var options = {
    "uri": urlBase + "/workitems/"+ workitem.id +"?api-version=4.1",
      "method": "PATCH",
      "headers": {
        "Authorization": authorization,
        'Content-Type': "application/json-patch+json; charset=utf-8"
      },              
      "body":JSON.stringify(data) 
    }
    
  return handlerPromise(options);    
}

function handlerPromise(options){
   
  return new Promise(function(resolve, reject) {
        
    request(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    })
  });
}

exports.workItemAtt = workItemAtt;
exports.workItemAdd = workItemAdd;
exports.workItemDel = workItemDel;
exports.workItemUpd = workItemUpd;
exports.attachmentAdd = attachmentAdd;