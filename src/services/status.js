// npx sequelize-cli model:generate --name status --attributes code:string,name:string
const status = [
  {
    id: 1,
    code: 'AC',
    name: 'Active'
  },
  {
    id: 2,
    code: 'IN',
    name: 'Inactive'
  }
]

export const getStatus = () => status
