import axios from 'axios'

function API(config = { headers: {}, method: 'get' }) {
  return axios({
    method: config.method,
    url: config.endpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`,
      ...config.headers,
    },
    data: config.data,
  })
}

export default API
