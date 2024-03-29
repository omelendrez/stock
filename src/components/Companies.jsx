import React, { useState, useEffect, useRef } from 'react'
import { getCompanies, saveCompany, deleteCompany } from './../services/companies'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Companies = () => {
  let timeout = useRef(0)
  const defaultCompany = {
    id: null,
    code: "",
    name: "",
    statusId: ""
  }
  const [companies, setCompanies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [company, setCompany] = useState(defaultCompany)
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
    const companies = await getCompanies()
    setCompanies(companies)
  }

  const addRecord = e => {
    e.preventDefault()
    setCompany(defaultCompany)
    setResponse({})
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveCompany(company)
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
    const newCompany = { ...company, [e.target.id]: e.target.value }
    setCompany(newCompany)
  }

  const editRecord = company => {
    setCompany(company)
    setResponse({})
    setShowForm(true)
  }

  const deleteRecord = company => {
    deleteCompany(company)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, statusId } = company

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        <Table
          title={t(language, "companies")}
          records={companies}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />
        <Alert response={response} />
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add company")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "companies")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")}</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">{t(language, "name")}</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
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

export default Companies