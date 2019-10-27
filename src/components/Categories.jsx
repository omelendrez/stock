import React, { useState, useEffect } from 'react'
import { getCategories } from './../services/categories'
import { getCompanies } from './../services/companies'
import Table from './common/Table'
import Form from './common/Form'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const categories = getCategories()
    setCategories(categories)
    const companies = getCompanies()
    setCompanies(companies)
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
        {categories.length && <Table
          title="Categories"
          records={categories}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Category</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Categories" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>

          <div class="form-group">
            <label for="companyId">Company</label>
            <select className="form-control" id="companyId">
              {companies.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Categories