import http from './api'

export const getStatus = async () => {
  const response = await http.get('/statuses')
  return response.data.statuses
}

export const saveStatus = status => {
  return new Promise((resolve, reject) => {
    http.post('/statuses', status)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteStatus = status => {
  return new Promise((resolve, reject) => {
    const { id } = status
    http.delete(`/statuses/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}