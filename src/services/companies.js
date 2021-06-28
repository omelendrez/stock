import http from './api'

export const getCompanies = async () => {
  const response = await http.get('/companies')
  return response.data.companies
}

export const saveCompany = company => {
  return new Promise((resolve, reject) => {
    http.post('/companies', company)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}

export const deleteCompany = company => {
  return new Promise((resolve, reject) => {
    const { id } = company
    http.delete(`/companies/${id}`)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}