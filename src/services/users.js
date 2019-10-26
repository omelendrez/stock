const users = [
  {
    id: 1,
    userName: 'Omar',
    email: 'omar.melendrez@gmail.com',
    fullName: 'Omar Melendrez',
    profileId: '1 - Administrator',
    statusId: '1 - Active'
  },
  {
    id: 2,
    userName: 'Angie',
    email: 'angeles.melendrez@gmail.com',
    fullName: 'Ma de los Angeles Melendrez',
    profileId: '1 - Administrator',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  }

]

export const getUsers = () => users
export const saveUser = user => console.log(user)