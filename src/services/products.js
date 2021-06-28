import http from './api'

export const getProducts = async () => {
  const response = await http.get('/products')
  return response.data.products
}

export const saveProduct = product => {
  return new Promise((resolve, reject) => {
    http.post('/products', product)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteProduct = product => {
  return new Promise((resolve, reject) => {
    const { id } = product
    http.delete(`/products/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}