import React, { useState, useEffect } from 'react'
import { getCompanies, saveCompany, deleteCompany } from './../services/companies'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'
// TODO
import Alert from './common/Alert'

const Companies = () => {
  const defaultCompany = {
    id: null,
    code: "",
    name: "",
    statusId: 1,
  }
  const [companies, setCompanies] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [company, setCompany] = useState(defaultCompany)
  const [response, setResponse] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  // TODO
  useEffect(() => {
    const delay = response.success ? 3000 : 10000
    setTimeout(() => {
      setResponse({})
    }, delay)
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
    setShowForm(true)
  }

  // TODO
  const save = e => {
    e.preventDefault()
    saveCompany(company)
      .then(data => {
        setResponse(data)
        fetchData()
        setShowForm(false)
      })
      .catch(err => setResponse(err.response.data))
  }

  const cancel = e => {
    e.preventDefault()
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

  // TODO
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
          title="Companies"
          records={companies}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />
        <Alert response={response} />

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

          <Alert response={response} />

        </Form>
      }
      {/*TODO*/}
    </React.Fragment>
  )
}

export default Companies