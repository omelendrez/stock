const users = [
  {
    id: 1,
    user_name: 'Omar',
    email: 'omar.melendrez@gmail.com',
    full_name: 'Omar Melendrez',
    profileId: '1 - Administrator',
    profile_id: '0 - Global Admin',
    statusId: '1 - Active'
  },
  {
    id: 2,
    user_name: 'Angie',
    email: 'angeles.melendrez@gmail.com',
    full_name: 'Ma de los Angeles Melendrez',
    profileId: '1 - Administrator',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  }

]

export const getUsers = () => users
export const saveUser = user => console.log(user)