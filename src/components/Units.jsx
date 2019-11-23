import React, { useState, useEffect, useRef } from 'react'
import { getUnits, saveUnit, deleteUnit } from './../services/units'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Units = () => {
  let timeout = useRef(0)
  const defaultUnit = {
    id: null,
    code: "",
    name: "",
    companyId: "",
  }
  const [units, setUnits] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])
  const [unit, setUnit] = useState(defaultUnit)
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
    const units = await getUnits()
    setUnits(units)
    const companies = await getCompanies()
    setCompanies(companies)
  }

  const addRecord = e => {
    e.preventDefault()
    setUnit(defaultUnit)
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveUnit(unit)
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
    const newUnit = { ...unit, [e.target.id]: e.target.value }
    setUnit(newUnit)
  }

  const editRecord = unit => {
    setUnit(unit)
    setShowForm(true)
  }

  const deleteRecord = unit => {
    deleteUnit(unit)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, companyId } = unit

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        <Table
          title={t(language, "units")}
          records={units}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />

        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add unit")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "units")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")} </label>
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

          <Alert response={response} />

        </Form>
      }
    </React.Fragment>
  )
}

export default Units