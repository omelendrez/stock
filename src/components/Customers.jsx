import React, { useState, useEffect } from 'react'
import { getCustomers , saveCustomer } from './../services/customers'
import { getCompanies } from './../services/companies'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Customers = () => {
  const defaultCustomer = {
    id: -1,
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    contact: "",
    vat: 0,
    companyId: "",
    statusId: 1
  }

  const [customer, setCustomer] = useState(defaultCustomer)
  const [customers, setCustomers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])
  const [status, setStatus] = useState([])

  useEffect(() => {
    const customers = getCustomers()
    setCustomers(customers)
    const companies = getCompanies()
    setCompanies(companies)
    const status = getStatus()
    setStatus(status)
  }, [])

  const addRecord = e => {
    e.preventDefault()
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setShowForm(false)
  }

  const editRecord = customer => {
    setCustomer(customer)
    setShowForm(true)
  }

  const updateForm = e => {
    e.preventDefault()
    const newCustomer = { ...customer, [e.target.id]: e.target.value }
    setCustomer(newCustomer)
  }

  const { code, name, address, phone, email, contact, vat, companyId, statusId } = customer

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {customers.length && <Table
          title="Customers"
          records={customers}
          editRecord={editRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Customer</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Customers" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>

          <div className="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" className="form-control" />
          </div>

          <div className="form-group">
            <label for="phone">Phone</label>
            <input type="text" id="phone" className="form-control" />
          </div>

          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" className="form-control" />
          </div>

          <div className="form-group">
            <label for="contact">Contact</label>
            <input type="text" id="contact" className="form-control" />
          </div>

          <div className="form-group">
            <label for="vat">Vat</label>
            <input type="text" id="vat" className="form-control" />
          </div>

          <div class="form-group">
            <label for="companyId">Company</label>
            <select className="form-control" id="companyId">
              {companies.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div class="form-group">
            <label for="statusId">Status</label>
            <select className="form-control" id="statusId">
              {status.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Customers