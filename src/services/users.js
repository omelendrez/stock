import http from './api'

export const getUsers = async () => {
  const response = await http.get('/users')
  return response.data.users
}

export const saveUser = user => {
  return new Promise((resolve, reject) => {
    http.post('/users', user)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteUser = user => {
  return new Promise((resolve, reject) => {
    const { id } = user
    http.delete(`/users/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}