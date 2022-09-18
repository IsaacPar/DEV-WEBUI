import fs from "fs"
import express from "express"
import cors from "cors"

let app = express()

app.use(cors())

app.get('/', (req, res) => {
    console.log("Acessed")
    if (req.headers["user-agent"].includes("curl") || req.headers["user-agent"].includes("wget") ) {
        res.send(`
            \u001b[34m------------\u001b[0m
            \u001b[33;1m \u001b[7mDATA WEBUI\u001b[0m
            \u001b[34m------------\u001b[0m\n

        \u001b[7mAcessed on:  \u001b[4m${new Date().toLocaleDateString()}\u001b[0m
        `)
    } else {
        res.send(fs.readFileSync("fallback.html", "utf8"))
    }
})

app.listen(5556)