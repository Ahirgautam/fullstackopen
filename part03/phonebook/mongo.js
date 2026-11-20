import mongoose from "mongoose";
import "dotenv/config"
if (process.argv.length < 3) {
    console.log("Please provide password!")
    process.exit(1)
}

const password = process.argv[2]
const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url, { family: 4 })



const phoneSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
})

const Phone = mongoose.model("Phone", phoneSchema)

if (process.argv.length == 3) {
    const result = await Phone.find({});
    console.log("Phonebook :")
    console.table(result.map(phone => ({ name: phone.name, number: parseInt(phone.number) })))
    mongoose.connection.close()
    process.exit(0)
}

if (process.argv.length < 5) {
    console.log("please provide name and number")
    process.exit(1)
}
const phone1 = new Phone({
    name: process.argv[3],
    number: process.argv[4]
})

phone1.save().then((result) => {
    console.log(`added ${phone1.name} number ${phone1.number} to phonebook`)
    mongoose.connection.close()
})