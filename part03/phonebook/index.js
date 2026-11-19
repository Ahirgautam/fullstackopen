import express from "express"
import morgan from "morgan"
import cors from 'cors'
import "dotenv/config"


const app = express()
app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))
const PORT = 3001
let data = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get("/api/notes", (req, res) => {
    res.json(data)
})
app.get("/api/notes/:id", (req, res) => {
    const id = req.params.id
    const note = data.filter(note => note.id === id)
    if (!note.length) {
        return res.status(404).json({ error: "no note found" })
    }

    res.json(note)
})

app.get("/api/info", (req, res) => {
    res.write(`Phonebook has info for ${data.length} people`)
    const d = new Date()
    res.write("\n")
    res.write(d.toUTCString())
    res.send()
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    const note = data.filter(note => note.id === id)
    if (note.length === 0) {
        return res.status(204).json({ error: "no note found" })
    }
    data = data.filter(note => note.id != id)
    res.send();

})
app.post("/api/notes", (req, res) => {
    const body = req.body;
    if (body.name == "" || body.number == "") {
        return res.status(400).json({ error: "please provide name and number" })
    }
    if (data.some(note => note.name === body.name)) {
        return res.status(400).json({ error: "name must be unique" })
    }
    const newId = Math.floor(Math.random() * 99999)
    const newNote = { name: body.name, number: body.number, id: newId }
    data.push(newNote)
    res.status(201).json(newNote)

})

app.use((req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
})
app.listen(process.env.PORT || PORT, () => {
    console.log("app running on port ", process.env.PORT)
})