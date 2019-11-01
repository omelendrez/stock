// npx sequelize-cli model:generate --name category --attributes code:string,name:string,companyId:integer
const categories = [
  {
    id: 1,
    code: '01',
    name: 'Antibioticos',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 2,
    code: '02',
    name: 'Antiparasitarios',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 3,
    code: '03',
    name: 'Vacunas',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 4,
    code: '04',
    name: 'Shampoo',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 5,
    code: '05',
    name: 'Balanceados',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 6,
    code: '06',
    name: 'Pomada',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 7,
    code: '07',
    name: 'Gotas',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 8,
    code: '08',
    name: 'Hormonal',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 9,
    code: '09',
    name: 'Suplemento',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 10,
    code: '10',
    name: 'Tranquilizante',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 11,
    code: '11',
    name: 'Antiinflamatorios',
    companyId: 'Veterinaria Colitas Felices'
  },
  {
    id: 12,
    code: '12',
    name: 'Varios',
    companyId: 'Veterinaria Colitas Felices'
  }
]

export const getCategories = () => categories
export const saveCategory = category => console.log(category)
export const deleteCategory = category => console.log(category)