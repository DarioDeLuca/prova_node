const express = require("express")
const fs = require("fs")
const port = 8080
const fetch = require("node-fetch")
const app = new express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const credenziali =  { 
    "nome": "Dario",
    "cognome": "De Luca",
    
}

app.get("/accreditamento", (req,res) => {
    res.json(credenziali)

})

app.post("/somma-pari", (req,res) => {
   
    let array = req.body
    let somma = array.filter(i => i%2 ===0).reduce((num,tot) => tot += num);
    let risultato ={
        "sum":somma
    }
    res.send(risultato)
})

app.put("/lista-parole-a", (req,res) => {
   
    let array = req.body

    let nParole = array.filter(i => i.length > 4)
   
    let newArray = nParole.join(" ")
        
    let risultato ={
        "count": nParole.length,
        "words": newArray,
    }
    res.send(risultato)
})



app.post("/comments", async(req,res) => {
    const id = req.params.id
    let lista = await fetch(`https://jsonplaceholder.typicode.com/post/${id}/comments`)
    let parole = await lista[0].body.split(" ")
    res.json({
        count:parole.length
    })
})



app.listen(port, () => console.log(`Server avviato sulla porta ${port}`));