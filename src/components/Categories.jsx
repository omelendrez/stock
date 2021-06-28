import React, { useState, useEffect, useRef } from 'react'
import { getCategories, saveCategory, deleteCategory } from './../services/categories'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Categories = () => {
  let timeout = useRef(0)
  const defaultCategory = {
    id: null,
    code: "",
    name: "",
    companyId: "",
  }

  const [category, setCategory] = useState(defaultCategory)
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])
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
    const companies = await getCompanies()
    setCompanies(companies)
    const categories = await getCategories()
    setCategories(categories)
  }

  const addRecord = e => {
    e.preventDefault()
    setCategory(defaultCategory)
    setResponse({})
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveCategory(category)
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
    const newCategory = { ...category, [e.target.id]: e.target.value }
    setCategory(newCategory)
  }

  const editRecord = category => {
    setCategory(category)
    setResponse({})
    setShowForm(true)
  }

  const deleteRecord = category => {
    deleteCategory(category)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, companyId } = category

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {categories.length && <Table
          title={t(language, "categories")}
          records={categories}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add category")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "categories")} save={save} cancel={cancel}>

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
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
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

export default Categories