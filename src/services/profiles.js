import http from './api'

export const getProfiles = async () => {
  const response = await http.get('/profiles')
  return response.data.profiles
}

export const saveProfile = profile => {
  return new Promise((resolve, reject) => {
    http.post('/profiles', profile)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteProfile = profile => {
  return new Promise((resolve, reject) => {
    const { id } = profile
    http.delete(`/profiles/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}