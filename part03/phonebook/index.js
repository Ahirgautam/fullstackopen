import express from "express"
import morgan from "morgan"
import Phone from "./models/phone.js"
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

app.get("/api/phones", (req, res, next) => {
    Phone.find({})
        .then(result => {
            res.json(result)
        })
        .catch(err => next(err))
})
app.get("/api/phones/:id", (req, res, next) => {
    const id = req.params.id
    Phone.findById(id)
        .then(result => {
            if (result) {
                res.json(result)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

app.get("/api/info", async (req, res) => {
    try {
        const count = await Phone.countDocuments({})
        const date = new Date()

        res.send(
            `Phonebook has info for ${count} people\n${date.toUTCString()}`
        )
    } catch (error) {
        res.status(500).json({ error: "Database error" })
    }
})

app.delete("/api/phones/:id", (req, res, next) => {
    const id = req.params.id
    Phone.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))

})
app.post("/api/phones", async (req, res, next) => {
    const body = req.body;

    if (body.name == "" || body.number == "") {
        return res.status(400).json({ error: "please provide name and number" })
    }
    const existingPhone = await Phone.find({ name: body.name });

    if (existingPhone.length > 0)
        return res.status(400).json({ error: "name must be unique" })

    const phone = new Phone({
        name: body.name,
        number: body.number
    })

    phone.save()
        .then(result => res.status(201).json(result))
        .catch(err => next(err))
})
app.put("/api/phones/:id", (req, res, next) => {
    const { name, number } = req.body
    Phone.findById(req.params.id)
        .then(phone => {
            if (!phone) {
                return res.status(404).end()
            }
            phone.name = name
            phone.number = number
            return phone.save()
                .then(updatedPhone => res.json(updatedPhone))
        })
        .catch(err => next(err))
})
app.use((req, res) => {
    res.status(404).send({ error: "unknown endpoint" })
})
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)
app.listen(process.env.PORT || PORT, () => {
    console.log("app running on port ", process.env.PORT)
})