import React, { useState, useEffect } from 'react'
import { getStores, saveStore, deleteStore } from './../services/stores'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Stores = () => {
  const defaultStore = {
    id: -1,
    code: "",
    name: "",
    companyId: "",
    statusId: "1",
  }
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])
  const [store, setStore] = useState(defaultStore)

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
    saveStore(store)
    setStore(defaultStore)
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setStore(defaultStore)
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newStore = { ...store, [e.target.id]: e.target.value }
    setStore(newStore)
  }

  const editRecord = store => {
    setStore(store)
    setShowForm(true)
  }

  const deleteRecord = store => {
    deleteStore(store)
  }

  const { code, name, companyId, statusId } = store

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {stores.length && <Table
          title="Stores"
          records={stores}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Store</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Stores" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Company</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)} >
              {companies.map(st => <option key={st.id} alue={st.id}>{st.name}</option>)}
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

export default Stores
