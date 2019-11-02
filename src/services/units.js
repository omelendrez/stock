import http from './api'

export const getUnits = async () => {
  const response = await http.get('/units')
  return response.data.units
}

export const saveUnit = unit => {
  return new Promise((resolve, reject) => {
    http.post('/units', unit)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteUnit = unit => {
  return new Promise((resolve, reject) => {
    const { id } = unit
    http.delete(`/units/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}


