import fs from "fs"
import express from "express"
import cors from "cors"

let app = express()

let o = fs.readFileSync("message.ansi", "utf8")

let rm = (str, replace, replaced) => {
    while (str.indexOf(replace) !== -1) {
        str = str.replace(replace, replaced)
    }
    return str
}

let parseTemplate = (string) => {
    let matches = string.match(/\$\{(.*?)\}/g)
    matches.forEach((match) => {
        string = string.replace(match, eval(match.substring(2, match.length - 1)))
    })
    return string
}

o = rm(o, "\\u001b", "\u001b")
o = rm(o, "\\n", "\n")

let printText = `a`.replace("a", o)
printText = parseTemplate(printText)

app.use(cors())

app.get('/', (req, res) => {
    console.log("Acessed")
    if (req.headers["user-agent"].includes("curl") || req.headers["user-agent"].includes("wget") ) {
        res.send(printText)
    } else {
        res.send(fs.readFileSync("fallback.html", "utf8"))
    }
})

app.listen(5556, () => {
    console.log("listening on port 5556")
    console.log("Here: \n", printText)
})