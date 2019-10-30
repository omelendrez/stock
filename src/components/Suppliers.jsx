import React, { useState, useEffect } from 'react'
import { getSuppliers, saveSupplier, deleteSupplier } from './../services/suppliers'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Suppliers = () => {
  const defaultSupplier = {
    id: -1,
    code: "",
    name: "",
    phoneNumber: "",
    address: "",
    contact: "",
    companyId: "",
    statusId: "1",
  }
  const [suppliers, setSuppliers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])
  const [supplier, setSupplier] = useState(defaultSupplier)

  useEffect(() => {
    const suppliers = getSuppliers()
    setSuppliers(suppliers)
    const status = getStatus()
    setStatus(status)
    const companies = getCompanies()
    setCompanies(companies)
  }, [])

  const addRecord = e => {
    e.preventDefault()
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveSupplier(supplier)
    setSupplier(defaultSupplier)
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setSupplier(defaultSupplier)
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newSupplier = { ...supplier, [e.target.id]: e.target.value }
    setSupplier(newSupplier)
  }

  const editRecord = supplier => {
    setSupplier(supplier)
    setShowForm(true)
  }

  const deleteRecord = supplier => {
    deleteSupplier(supplier)
  }

  const { code, name, phoneNumber, address, contact, companyId, statusId } = supplier

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {suppliers.length && <Table
          title="Suppliers"
          records={suppliers}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Supplier</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Suppliers" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="text" id="phoneNumber" className="form-control" value={phoneNumber} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" className="form-control" value={address} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact</label>
            <input type="text" id="contact" className="form-control" value={contact} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Company</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)} >
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">Status</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)} >
              {status.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Suppliers