import React, { useState, useEffect } from 'react'
import { getUnits } from './../services/units'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Units = () => {
  const [units, setUnits] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, SetCompanies] = useState([])

  useEffect(() => {
    const units = getUnits()
    setUnits(units)
    const status = getStatus()
    setStatus(status)
    const companies = getCompanies()
    SetCompanies(companies)
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
        {units.length && <Table
          title="Units"
          records={units}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Units</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Units" save={save} cancel={cancel}>

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

        </Form>
      }
    </React.Fragment>
  )
}

export default Units