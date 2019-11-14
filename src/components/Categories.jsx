import React, { useState, useEffect } from 'react'
import { getCategories, saveCategory, deleteCategory } from './../services/categories'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Categories = () => {
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

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const companies = await getCompanies()
    setCompanies(companies)
    const categories = await getCategories()
    setCategories(categories)
  }

  const addRecord = e => {
    e.preventDefault()
    setCategory(defaultCategory)
    setShowForm(true)
  }

  const save = async e => {
    e.preventDefault()
    await saveCategory(category)
    fetchData()
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newCategory = { ...category, [e.target.id]: e.target.value }
    setCategory(newCategory)
  }

  const editRecord = category => {
    setCategory(category)
    setShowForm(true)
  }

  const deleteRecord = async category => {
    await deleteCategory(category)
    fetchData()
  }

  const { code, name, companyId } = category

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {categories.length && <Table
          title="Categories"
          records={categories}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Category</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Categories" save={save} cancel={cancel}>

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
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Categories