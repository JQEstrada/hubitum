import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `https://hubitum.onrender.com:443/`
  })
}
