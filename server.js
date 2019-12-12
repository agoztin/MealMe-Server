const express = require('express');
const connection = require("./src/connection");
const crud = require('./api/crud');
// const https = require('https');
const request = require('request');


const app = express();

const PORT = 8080;

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Sample App is listening on PORT: ${PORT}`);

    connection().then(()=>{ console.log("Connected to Mongo!") });

});

app.get("/", async (req,res)=>{
    let meals = await crud.count();
    res.json({
        "name":"MelMe Server",
        "status":"online",
        "meals":meals
    });
});

app.get("/meals",async (req,res)=>{
    try {
        res.json(await crud.getAll());
    } catch(e) {
        res.send(errorMsg(e))
    }
});

app.post("/insert",async (req,res)=>{
    try {
        res.send(await crud.addOne(req.body.meals));
    } catch (e) {
        res.send(errorMsg(e));
    }
});

app.get("/clear", async(req,res) => {
    try {
        await crud.clear();
        res.send("cleared");
    } catch (e) {
        res.send(errorMsg(e));
    }
});

app.get("/sync", async (req,res) => {
    // res.setHeader('Content-Type', 'text/html');
    res.write("starting sync");
    str = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < str.length; i++) {
        try {
            let query = await async_request('https://www.themealdb.com/api/json/v1/1/search.php?f='+str.charAt(i));
            let result = await crud.addOne(query.body.meals);
            res.write("\nAdded " + result.meals.length + " meals starting with letter '" + str.charAt(i) + "'");
        } catch (e) {
            console.log(e);
            res.write("\n" + e);
        }
    }
    res.write("\nsync ready");
    res.end();
});

app.get("/search.php", async(req,res) => {
    try {
        let result = await crud.search(req.query.s)
        res.send({ meals: result });
    } catch (e) {
        res.send(errorMsg(e));
    }
});


function errorMsg(msg) {
    return {
        error: msg
    }
}

async function async_request(url) {
    return new Promise((resolve, reject) => {
      request(url, { json: true,  method: 'GET' }, (error, response, body) => { return error ? reject(error) : resolve({ body, response }); })
    });
  }