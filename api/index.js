// Dependencies
import axios from 'axios'
import { toPairs } from 'ramda'

// Setup
export const API_URL = 'http://localhost:3010'
const axiosInstance = axios.create({
  baseURL: API_URL
})

/**
  Logs in the axios instance
*/
export function login (email, password) {
  return axiosInstance.post('/auth', {email, password})
    .then(response => {
      axiosInstance.defaults.headers.common['Authorization'] = response.data.data.token
      return response.data.data
    })
    .catch(error => {
      throw new Error(error)
    })
}

export function injectAuthorization (token) {
  axiosInstance.defaults.headers.common['Authorization'] = token
}

/**
  Gets a list of entities
*/
export function getEntities (modelName, parameters = {}) {
  const queryString = toPairs(parameters)
    .map(v => v.join('='))
    .join('&')

  return axiosInstance.get(`/${modelName}?${queryString}`)
    .then(result => result.data.data)
}

/**
  Fetches an existing antity by ID
*/
export function fetchEntity (modelName, id) {
  return axiosInstance.get(`/${modelName}/${id}`)
    .then(result => result.data.data)
}

/**
  Creates a new entity
*/
export function createEntity (modelName, data) {
  return axiosInstance.post(`/${modelName}`, data)
    .then(result => result.data)
}

/**
  Updates an existing entity
*/
export function updateEntity (modelName, id, data) {
  return axiosInstance.patch(`/${modelName}/${id}`, data)
    .then(result => result.data)
}

/**
  Deletes a list of entities by IDs
*/
export function deleteEntities (modelName, ids) {
  return axiosInstance.delete(`/${modelName}`, {data: ids})
    .then(result => result.data)
}

/**
  Uploads a file
*/

export function uploadFile (data) {
  return axiosInstance.post(`/files`, data)
    .then(result => result.data)
}
