import axios from "axios"
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
	return axios.get(baseURL).then(response => response.data)
}

const addContact = newPerson => {
	return axios.post(baseURL, newPerson).then(response => response.data)
}

const updateContact = (id, newContact) => {
	return axios.put(`${baseURL}/{id}`, newContact)
}

export default { getAll, addContact, updateContact }