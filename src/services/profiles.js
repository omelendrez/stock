const profiles = [
  {
    id: 1,
    code: 'ADM',
    name: 'Administrator'
  },
  {
    id: 2,
    code: 'SUP',
    name: 'Supervisor'
  },
  {
    id: 3,
    code: 'STK',
    name: 'Storekeeper'
  },
  {
    id: 4,
    code: 'SAL',
    name: 'Sales representative'
  },
  {
    id: 5,
    code: 'R_O',
    name: 'Read only'
  }
]

export const getProfiles = () => profiles
export const saveProfile = profile => console.log(profile)
export const deleteProfile = profile => console.log(profile)