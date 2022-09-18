import fs from "fs"
import express from "express"
import cors from "cors"

import message from "./message.js"

let app = express()

let rm = (str, replace, replaced) => {
    while (str.indexOf(replace) !== -1) {
        str = str.replace(replace, replaced)
    }
    return str
}


app.use(cors())

app.get('/', (req, res) => {
    console.log("Acessed")
    if (req.headers["user-agent"].includes("curl") || req.headers["user-agent"].includes("wget") ) {
        let o = message(req)

        o = rm(o, "\\u001b", "\u001b")
        o = rm(o, "\\n", "\n")

        let printText = `a`.replace("a", o)

        res.send(printText)
    } else {
        res.send(fs.readFileSync("fallback.html", "utf8"))
    }
})

app.listen(5556, () => {
    console.log("listening on port 5556")
})