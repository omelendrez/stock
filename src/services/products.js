const products = [
  {
    id: 1,
    code: 'P-0001',
    name: 'Floxacin Enrofloxacina 5% AFFORD',
    category_id: '1 - Antibioticos',
    unit_id: '9 - Millilitre',
    minimum: 0,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 125.68,
    last_sale_data: '2019-05-01',
    last_sale_price: 215.5,
    price: 215.5,
    company_id: '1 - Veterinaria Colitas Felices',
    status: '1 - Active'
  },
  {
    id: 2,
    code: 'P-0002',
    name: 'Cefalexina 500 mg PyoDerm Plus',
    category_id: '1 - Antibioticos',
    unit_id: '11 - Comprimido',
    minimum: 10,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 80,
    last_sale_data: '2019-05-01',
    last_sale_price: 120,
    price: 120,
    company_id: '1 - Veterinaria Colitas Felices',
    status: '2 - Locked'
  }

]

export const getProducts = () => products