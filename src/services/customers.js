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
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
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
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  }

]

export const getCustomers = () => customers
export const saveCustomer = customer => console.log(customer)