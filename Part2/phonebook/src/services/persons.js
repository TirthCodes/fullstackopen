import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

export const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}