import React, { useState, useEffect, useRef } from 'react'
import { getCustomers, saveCustomer, deleteCustomer } from './../services/customers'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config


const Customers = () => {
  let timeout = useRef(0)
  const defaultCustomer = {
    id: null,
    code: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    contact: "",
    vat: 0,
    companyId: "",
    statusId: ""
  }

  const [customer, setCustomer] = useState(defaultCustomer)
  const [customers, setCustomers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])
  const [status, setStatus] = useState([])
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
    const status = await getStatus()
    setStatus(status)
    const customers = await getCustomers()
    setCustomers(customers)
    const companies = await getCompanies()
    setCompanies(companies)
  }

  const addRecord = e => {
    e.preventDefault()
    setCustomer(defaultCustomer)
    setResponse({})
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveCustomer(customer)
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

  const editRecord = customer => {
    setCustomer(customer)
    setResponse({})
    setShowForm(true)
  }

  const updateForm = e => {
    e.preventDefault()
    const newCustomer = { ...customer, [e.target.id]: e.target.value }
    setCustomer(newCustomer)
  }

  const deleteRecord = customer => {
    deleteCustomer(customer)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, address, phone, email, contact, vat, companyId, statusId } = customer

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {customers.length && <Table
          title={t(language, "customers")}
          records={customers}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add customer")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "customers")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")}</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">{t(language, "name")}</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="address">{t(language, "address")}</label>
            <input type="text" id="address" className="form-control" value={address} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t(language, "phone")}</label>
            <input type="text" id="phone" className="form-control" value={phone} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t(language, "email")}</label>
            <input type="email" id="email" className="form-control" value={email} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="contact">{t(language, "contact")}</label>
            <input type="text" id="contact" className="form-control" value={contact} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="vat">{t(language, "vat")}</label>
            <input type="text" id="vat" className="form-control" value={vat} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">{t(language, "company")}</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
              <option></option>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">{t(language, "status")}</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)}>
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

export default Customers