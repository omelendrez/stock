const customers = [
  {
    id: 1,
    code: 'C-001',
    name: 'Zulema Lezcano',
    address: '',
    phone: '',
    email: '',
    contact: 'Zulema',
    vat: 0,
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  },
  {
    id: 2,
    code: 'C-002',
    name: 'Juan Perez',
    address: '',
    phone: '',
    email: '',
    contact: 'Juan',
    vat: 0,
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  }

]

export const getCustomers = () => customers
export const saveCustomer = customer => console.log(customer)