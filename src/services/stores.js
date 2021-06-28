import http from './api'

export const getStores = async () => {
  const response = await http.get('/stores')
  return response.data.stores
}

export const saveStore = store => {
  return new Promise((resolve, reject) => {
    http.post('/stores', store)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteStore = store => {
  return new Promise((resolve, reject) => {
    const { id } = store
    http.delete(`/stores/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}