const express = require("express")
const server = express()

const cors = require("cors")
const fetch = require("node-fetch")

server.use (cors( ))

server.use(express.urlencoded( { extended: false } ) )
server.use(express.json())

server.use(express.static(__dirname+"/public"))

server.set("view engine", "ejs")
server.set("views", __dirname+"\\public\\")

const baseUrl = "https://nhentai.net/api/"

async function Search ( keys ) {
    return new Promise ( ( res, rej ) => {
        fetch ( baseUrl + "galleries/search?query="+keys )
        .then ( response => response.json() )
        .catch ( err => { return rej(err) })
        .then ( data => {
            return res(data)
        })
    })
}

async function Infos ( id ) {

}

server.get("/search/:query", ( req, res ) => {
    let query = req.params.query
    if ( !query ) return res.send({err:"not query"})
    query = query.toString()
    Search ( query )
    .then ( data => {
        res.send(data)
    })
    .catch ( err => {
        res.send(err)
    })
})
server.listen(process.env.PORT || 3000)
console.log(process.env.PORT || 3000)