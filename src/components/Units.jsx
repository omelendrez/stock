import React, { useState, useEffect } from 'react'
import { getUnits, saveUnit, deleteUnit } from './../services/units'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Units = () => {
  const defaultUnit = {
    id: -1,
    code: "",
    name: "",
    companyId: "",
  }
  const [units, setUnits] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])
  const [unit, setUnit] = useState(defaultUnit)

  useEffect(() => {
    const units = getUnits()
    setUnits(units)
    const companies = getCompanies()
    setCompanies(companies)
  }, [])

  const addRecord = e => {
    e.preventDefault()
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveUnit(unit)
    setUnit(defaultUnit)
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setUnit(defaultUnit)
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newUnit = { ...unit, [e.target.id]: e.target.value }
    setUnit(newUnit)
  }

  const editRecord = unit => {
    setUnit(unit)
    setShowForm(true)
  }

  const deleteRecord = unit => {
    deleteUnit(unit)
  }

  const { code, name, companyId } = unit

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {units.length && <Table
          title="Units"
          records={units}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Unit</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Units" save={save} cancel={cancel}>

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
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Units