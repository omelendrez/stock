// npx sequelize-cli model:generate --name store --attributes code:string,name:string,companyId:integer,statusId:integer
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
export const deleteStore = store => console.log(store)