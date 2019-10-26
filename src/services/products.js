const products = [
  {
    id: 1,
    code: 'P-0001',
    name: 'Floxacin Enrofloxacina 5% AFFORD',
    categoryId: 'Antibioticos',
    unitId: 'Millilitre',
    minimum: 0,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 125.68,
    last_sale_data: '2019-05-01',
    last_sale_price: 215.5,
    price: 215.5,
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Active'
  },
  {
    id: 2,
    code: 'P-0002',
    name: 'Cefalexina 500 mg PyoDerm Plus',
    categoryId: 'Antibioticos',
    unitId: 'Comprimido',
    minimum: 10,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 80,
    last_sale_data: '2019-05-01',
    last_sale_price: 120,
    price: 120,
    companyId: 'Veterinaria Colitas Felices',
    statusId: 'Locked'
  }

]

export const getProducts = () => products
export const saveProduct = product => console.log(product)