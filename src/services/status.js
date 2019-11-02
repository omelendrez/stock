import http from './api'

export const getStatus = async () => {
  const response = await http.get('/statuses')
  return response.data.Status
}

export const saveStatus = Status => {
  return new Promise((resolve, reject) => {
    http.post('/statuses', Status)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteStatus = Status => {
  return new Promise((resolve, reject) => {
    const { id } = Status
    http.delete(`/statuses/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}