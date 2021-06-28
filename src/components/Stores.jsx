import React, { useState, useEffect, useRef } from 'react'
import { getStores, saveStore, deleteStore } from './../services/stores'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Stores = () => {
  let timeout = useRef(0)
  const defaultStore = {
    id: null,
    code: "",
    name: "",
    companyId: "",
    statusId: "",
  }
  const [stores, setStores] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])
  const [store, setStore] = useState(defaultStore)
  const [response, setResponse] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      if (response.success) {
        setResponse({})
        setShowForm(false)
      }
    }, 1000)
  }, [response])

  const fetchData = async () => {
    const stores = await getStores()
    setStores(stores)
    const status = await getStatus()
    setStatus(status)
    const companies = await getCompanies()
    setCompanies(companies)
  }

  const addRecord = e => {
    e.preventDefault()
    setStore(defaultStore)
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveStore(store)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const cancel = e => {
    e.preventDefault()
    setResponse({})
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
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, companyId, statusId } = store

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        <Table
          title={t(language, "stores")}
          records={stores}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />

        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add store")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "stores")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")}</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">{t(language, "name")}</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">{t(language, "company")}</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)} >
              <option></option>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">{t(language, "status")}</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)} >
              <option></option>
              {status.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <Alert response={response} />

        </Form>
      }
    </React.Fragment>
  )
}

export default Stores
