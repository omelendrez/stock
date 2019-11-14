import http from './api'

export const getCategories = async () => {
  const response = await http.get('/categories')
  return response.data.categories
}

export const saveCategory = category => {
  return new Promise((resolve, reject) => {
    http.post('/categories', category)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteCategory = category => {
  return new Promise((resolve, reject) => {
    const { id } = category
    http.delete(`/categories/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}