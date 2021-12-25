require('dotenv').config();
const express = require("express");
const fs = require("fs");
const fsPromises = fs.promises;
const app = express();
const PORT = process.env.PORT || 3000;
const PATH = require('path')

getViews = async () => {
    let views = await fsPromises.readFile('data.txt').catch((err)=>console.log("Error while getting views", err));
    views = Number(views.toString())+1;
    await fsPromises.writeFile('data.txt', views.toString()).catch((err)=>console.log("Error while updating views", err));
    return views;
}

app.set("view engine", "ejs");
app.use(express.static(PATH.join(__dirname, "public")));

app.get('/', async (req,res) => {
    let data = await getViews();
    res.render('index', {data})
})

app.listen(PORT, ()=>{
    console.log("app started");
})