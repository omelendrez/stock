import http from './api'

export const getSuppliers = async () => {
  const response = await http.get('/suppliers')
  return response.data.suppliers
}

export const saveSupplier = supplier => {
  return new Promise((resolve, reject) => {
    http.post('/suppliers', supplier)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteSupplier = supplier => {
  return new Promise((resolve, reject) => {
    const { id } = supplier
    http.delete(`/suppliers/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}