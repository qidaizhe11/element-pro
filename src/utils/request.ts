
import axios, { AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true
})

service.interceptors.response.use(
  response => {
    return response
  },
  (error: any) => {
    console.log(
      'fetch',
      error.config.url,
      error.config.params,
      'error. error:',
      error
    )
    return Promise.reject(error)
  }
)

export default service

