var vsts = require('./modules/vsts');
const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

const port = 8888



app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'views/layouts')
      }))
      app.set('view engine', '.hbs')
      app.set('views', path.join(__dirname, 'views'))
      
      app.get('/', (request, response) => {
              response.render('home', {
                name: 'Rodrigo Brandão'
              })
            })

        app.get('/workItem/add', (request, response) => {
        
        response.render('workItemAdd', {})
        })

        app.post('/workItem/Created', urlencodedParser, (request, response) => {
                
                var form = request.body;
                                
                var workitem = {
                        Id: 0,
                        Title: form.txtTitle, 
                        AssignedTo: form.txtAssignedTo,
                        AreaPath: "AtentoBR\\Estudo",
                        IterationPath:"AtentoBR\\Estudo",
                        Description: form.txtDescription,
                        Content: ""
                };
                
                var attach;
                var workItemAdded = vsts.workItemAdd(workitem);
                workItemAdded.then(wi=> {

                var content = 'protocolo número ' + wi.id + '\n' +
                                'area path ' + wi.fields["System.AreaPath"]  + '\n' +
                                'AssignTo ' + wi.fields["System.AssignedTo"] + '\n' +
                                'Acompanhe sua solicitação em: https://atentoalm.visualstudio.com/AtentoBR/_boards/board/t/Estudo/Requirements';
                        
                workitem.Id = wi.id;
                workitem.Content = content;
                //email.sendEmail('Solicitação criada com sucesso', content);
                
                })
                .then(()=>{
                           
                      attachmentAdded = vsts.attachmentAdd();
                      attachmentAdded.then(attach=> {
                        vsts.workItemAtt({id: workitem.Id, url: attach.url})           
                     });
                })
                .then(()=> {

                        response.render('workItemCreated', {WorkItem:workitem});
                })
       })

        app.get('/workItem/get', (request, response) => {
                response.render('workItemGet', {})
                })

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

