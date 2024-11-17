const express = require('express')
const path = require('path')
const fs = require('fs');
const { log } = require('console');

const app=express()

app.set("view engine","ejs");
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get("/",function(req,res,next){
    fs.readdir(`./files`,function(err,files){
        console.log(files)
        res.render("index",{files:files});
    })
   
})

app.post("/create",function(req,res,next){
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,
    req.body.details,function(err){
        res.redirect("/")
    })
   
})

app.get("/files/:filename",function(req,res,next){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename,filedata:filedata})
    })
})
app.get("/edit/:filename",function(req,res,next){
    res.render("edit",{filename:req.params.filename})
})

app.get("/delete/:filename",function(req,res,next){
    fs.rm(`./files/${req.params.filename}`,function(err){
        res.redirect("/");
    })
})

app.post("/edit",function(req,res,next){
    fs.rename(`./files/${req.body.prevname}`,`./files/${req.body.newname}`,function(err){
        res.redirect("/")
    })
})



app.listen(3000,function(){
    console.log("Server is running on port 3000")
})