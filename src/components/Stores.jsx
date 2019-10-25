import React, { useState, useEffect } from 'react'
import { getStores } from './../services/stores'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Stores = () => {
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const stores = getStores()
    setStores(stores)
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
        {stores.length && <Table
          title="Stores"
          records={stores}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Store</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Stores" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
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

export default Stores
