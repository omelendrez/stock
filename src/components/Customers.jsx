import React, { useState, useEffect } from 'react'
import { getCustomers, saveCustomer, deleteCustomer } from './../services/customers'
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
    setCustomer(defaultCustomer)
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveCustomer(customer)
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

  const deleteRecord = customer => {
    deleteCustomer(customer)
  }

  const { code, name, address, phone, email, contact, vat, companyId, statusId } = customer

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {customers.length && <Table
          title="Customers"
          records={customers}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Customer</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Customers" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" className="form-control" value={address} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="text" id="phone" className="form-control" value={phone} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="form-control" value={email} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" className="form-control" value={contact} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="vat">V.A.T</label>
            <input type="text" id="vat" className="form-control" value={vat} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Company</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">Status</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)}>
              {status.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Customers