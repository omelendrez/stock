const suppliers = [
  {
    id: 1,
    code: 'V-001',
    name: 'El Bagual',
    phoneNumber: '154737118',
    address: '',
    contact: 'Oscar',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  },
  {
    id: 2,
    code: 'V-002',
    name: 'Ultra Tech',
    phoneNumber: '4812211',
    address: 'Necochea 636',
    contact: 'Leonardo Mayo',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  },
  {
    id: 3,
    code: 'V-003',
    name: 'Distribuidora Dorrego',
    phoneNumber: '154142467',
    address: '',
    contact: 'Americo',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  },
  {
    id: 4,
    code: 'V-004',
    name: 'Royal Canin',
    phoneNumber: '2914738145',
    address: '',
    contact: 'Facundo',
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  }
]

export const getSuppliers = () => suppliers
export const saveSupplier = supplier => console.log(supplier)