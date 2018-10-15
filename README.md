# VSTS API 
==============

This is a simple proof of concept HTTP-based applications in Node.js + VSTS API to create workitems

You can start HTTP server with

      node index.js

The file module/vsts.js requires authorization from VSTS Base64 
So, you need to convert it like this: "":[your_token_from VSTS] and then gerate a Base64 string

      var authorization = "Basic xxxxxx"

The VSTS url project must be change 

      var urlBase = "https://[your_organization].visualstudio.com/[project]/_apis/wit";

# Add a workitem

Acess http://localhost:8888/Workitem/Add
![alt text](https://raw.githubusercontent.com/rodrigobrandao/vstsAPI/master/printWorkItemAdd.jpg)

# Get a list workitems

Acess http://localhost:8888/Workitem/Get
![alt text](https://raw.githubusercontent.com/rodrigobrandao/vstsAPI/master/printWorkItemGet.jpg)

