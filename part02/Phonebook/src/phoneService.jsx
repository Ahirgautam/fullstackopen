import axios from "axios";
const baseUrl = '/api/notes'
const getAll = () =>
    axios.get(baseUrl).then(response => response.data)

const addPerson = person =>
    axios.post(baseUrl, person).then(response => response.data)

const deletePerson = id =>
    axios.delete(`${baseUrl}/${id}`).then(() => true)

const updatePerson = person =>
    axios.put(`${baseUrl}/${person.id}`, person).then(response => response.data)

export default {
    getAll,
    addPerson,
    deletePerson,
    updatePerson,
}