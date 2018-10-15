# VSTS API 
==============

This is a simple proof of concept HTTP-based applications in Node.js + VSTS API to create workitems

You can start HTTP server with

      node index.js

The file module/vsts.js requires authorization from VSTS Base64 and you need to convert it like this: "":[your_token_from VSTS] 

      var authorization = "Basic xxxxxx"


# Add a workitem

Acess http://localhost:8888/Workitem/Add
![alt text](https://raw.githubusercontent.com/rodrigobrandao/vstsAPI/master/printWorkItemAdd.jpg)

# Get a list workitems

Acess http://localhost:8888/Workitem/Get
![alt text](https://raw.githubusercontent.com/rodrigobrandao/vstsAPI/master/printWorkItemGet.jpg)

