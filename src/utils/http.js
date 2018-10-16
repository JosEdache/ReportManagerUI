import axios from 'axios'


const getDomain = () => {
  if (process.env.NODE_ENV == 'production')
    return 'https://reports-manager.herokuapp.com'
  else return 'http://localhost:8080/'
}

const Http = axios.create({
  baseURL: getDomain()
})

console.log(getDomain())


export default Http;
