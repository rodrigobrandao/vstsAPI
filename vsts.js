var vsts = require('./modules/vsts');
var email = require('./modules/email');

var command = process.argv[2];

main();

async function main(){

if(command == "Add")
  {
    var workitem = {
      Title: "Requisito criado via API", 
      AssignedTo: "rvbrandao@br.atento.com",
      AreaPath: "AtentoBR\\Estudo",
      IterationPath:"AtentoBR\\Estudo",
      Description: "Este é o contéudo do workitem criado as "+ Date() + " !!"
    };

     var wi = await vsts.workItemAdd(workitem);    
     
     var content = 'protocolo número ' + wi.id + '\n' +
                      'area path ' + wi.fields["System.AreaPath"]  + '\n' +
                      'AssignTo ' + wi.fields["System.AssignedTo"] + '\n' +
                      'Acompanhe sua solicitação em: https://atentoalm.visualstudio.com/AtentoBR/_boards/board/t/Estudo/Requirements'
        
        //email.sendEmail('Solicitação criada com sucesso', content);
        console.log(content)

        var attach = await vsts.attachmentAdd(); 
        vsts.workItemAtt({id: wi.id, url: attach.url})
             
  }
  else if(command == "Del"){

    var workitemId = process.argv[3];
    
    var wi = await vsts.workItemDel(workitemId);
    console.log('workitem '+ wi.id + " excluido com sucesso");

  }
  else if(command == "Upd"){

    var workitemId = process.argv[3];
    
    var wi = vsts.workItemUpd(workitemId);
    console.log('workitem atualizado com sucesso');
      
  }
  else if(command == "Att"){
            
      var wi = vsts.attachmentAdd();
      console.log(wi);
  }
}