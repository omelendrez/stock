const stores = [
  {
    id: 1,
    code: '01',
    name: 'Store 1',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  }
]

export const getStores = () => stores
export const saveStore = store => console.log(store)