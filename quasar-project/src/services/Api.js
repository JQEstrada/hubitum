import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://hubitum.onrender.com:443/'
  : 'http://localhost:3000/'

export default () => {
  return axios.create({
    baseURL: API_URL
  })
}