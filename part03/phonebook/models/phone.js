import mongoose from "mongoose"
import "dotenv/config"

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI, { family: 4 })
    .then(result => {
        console.log("Connected to mongodb ")
    })
    .catch(err => {
        console.log(err)
    })

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "name length must be of atleat 3 "],
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    }
})

mongoose.set("toJSON", {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

export default mongoose.model("Phone", phoneSchema)
