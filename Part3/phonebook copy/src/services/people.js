import axios from "axios"
const baseURL = "/api/persons"

const getAll = () => {
	return axios.get(baseURL).then(response => response.data)
}

const addContact = newPerson => {
	return axios.post(baseURL, newPerson).then(response => response.data)
}

const updateContact = (id, newContact) => {
	return axios.put(`${baseURL}/${id}`, newContact).then(response => response.data)
}

const deleteContact = id => {
	return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

export default { getAll, addContact, updateContact, deleteContact }