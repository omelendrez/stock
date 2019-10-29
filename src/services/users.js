const users = [
  {
    id: 1,
    userName: 'Omar',
    email: 'omar.melendrez@gmail.com',
    fullName: 'Omar Melendrez',
    profileId: 'Administrator',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  },
  {
    id: 2,
    userName: 'Angie',
    email: 'angeles.melendrez@gmail.com',
    fullName: 'Ma de los Angeles Melendrez',
    profileId: 'Administrator',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  }

]

export const getUsers = () => users
export const saveUser = user => console.log(user)
export const deleteUser = user => console.log(user)