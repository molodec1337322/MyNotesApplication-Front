const http = require("http")
const fs = require("fs")

const port = 3000
http.createServer(function (req, res){
    let filePath = "src/index.js"
    if(req.url !== "/"){
        filePath = req.url.substring(1)
    }
    fs.readFile(filePath, function(error, data){
        if(error){
            res.statusCode = 404
            res.end("Resource are not found")
        }
        else{
            res.end(data)
        }
    })
}).listen(port, function (){
    console.log("server started at port: " + port)
})