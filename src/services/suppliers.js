const suppliers = [
  {
    id: 1,
    code: 'V-001',
    name: 'El Bagual',
    phone_numer: '154737118',
    address: '',
    contact: 'Oscar',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  },
  {
    id: 2,
    code: 'V-002',
    name: 'Ultra Tech',
    phone_numer: '4812211',
    address: 'Necochea 636',
    contact: 'Leonardo Mayo',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  },
  {
    id: 3,
    code: 'V-003',
    name: 'Distribuidora Dorrego',
    phone_numer: '154142467',
    address: '',
    contact: 'Americo',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  },
  {
    id: 4,
    code: 'V-004',
    name: 'Royal Canin',
    phone_numer: '2914738145',
    address: '',
    contact: 'Facundo',
    companyId: '1 - Veterinaria Colitas Felices',
    statusId: '1 - Active'
  }
]

export const getSuppliers = () => suppliers
export const saveSupplier = supplier => console.log(supplier)