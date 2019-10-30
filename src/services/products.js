// npx sequelize-cli model:generate --name product --attributes code:string,name:string,categoryId:integer,minimum:integer,lastPurchaseDate:date,lastPurchasePrice:decimal,lastSaleDate:date,lastSalePrice:decimal,price:decimal,statusId:integer
const products = [
  {
    code: 'P-0001',
    name: 'Floxacin Enrofloxacina 5% AFFORD',
    categoryId: 'Antibioticos',
    minimum: 0,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 125.68,
    last_sale_data: '2019-05-01',
    last_sale_price: 215.5,
    price: 215.5,
    statusId: 'Active'
  },
  {
    code: 'P-0002',
    name: 'Cefalexina 500 mg PyoDerm Plus',
    categoryId: 'Antibioticos',
    minimum: 10,
    last_purchase_date: '2017-06-15',
    last_purchase_price: 80,
    last_sale_data: '2019-05-01',
    last_sale_price: 120,
    price: 120,
    statusId: 'Locked'
  }

]

export const getProducts = () => products
export const saveProduct = product => console.log(product)
export const deleteProduct = product => console.log(product)