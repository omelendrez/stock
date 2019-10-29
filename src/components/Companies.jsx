import React, { useState, useEffect } from 'react'
import { getCompanies, saveCompany, deleteCompany } from './../services/companies'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Companies = () => {
  const defaultCompany = {
    id: -1,
    code: "",
    name: "",
    statusId: "1",
  }
  const [companies, setCompanies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [company, setCompany] = useState(defaultCompany)

  useEffect(() => {
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
    saveCompany(company)
    setCompany(defaultCompany)
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setCompany(defaultCompany)
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newCompany = { ...company, [e.target.id]: e.target.value }
    setCompany(newCompany)
  }

  const editRecord = company => {
    setCompany(company)
    setShowForm(true)
  }

  const deleteRecord = company => {
    deleteCompany(company)
  }

  const { code, name, statusId } = company

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {companies.length && <Table
          title="Companies"
          records={companies}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Company</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Companies" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
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

export default Companies