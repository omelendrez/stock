import React, { useState, useEffect } from 'react'
import { getSuppliers } from './../services/suppliers'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])

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
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setShowForm(false)
  }

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {suppliers.length && <Table
          title="Suppliers"
          records={suppliers}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Suppliers</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Suppliers" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Phone Number</label>
            <input type="text" id="phone" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Adress</label>
            <input type="text" id="adress" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Contact</label>
            <input type="text" id="contact" className="form-control" />
          </div>

          <div class="form-group">
            <label for="status">Companies</label>
            <select className="form-control" id="status">
              {companies.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select className="form-control" id="status">
              {status.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Suppliers