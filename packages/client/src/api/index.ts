import axios from 'axios'

const apiInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  withCredentials: true,
})

export default apiInstance
