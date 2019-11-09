import React, { useState, useEffect } from 'react'
import { getProducts, saveProduct, deleteProduct } from './../services/products'
import { getCategories } from './../services/categories'
import { getCompanies } from './../services/companies'
import { getUnits } from './../services/units'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Products = () => {
  const defaultProduct = {
    id: null,
    code: "",
    name: "",
    categoryId: "",
    unitId: "",
    minimum: 0,
    price: 0,
    companyId: "",
    statusId: ""
  }

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState(defaultProduct)
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [categories, setCategories] = useState([])
  const [companies, setCompanies] = useState([])
  const [units, setUnits] = useState([])

  useEffect(() => {
    const products = getProducts()
    setProducts(products)
    const status = getStatus()
    setStatus(status)
    const categories = getCategories()
    setCategories(categories)
    const companies = getCompanies()
    setCompanies(companies)
    const units = getUnits()
    setUnits(units)
  }, [])

  const addRecord = e => {
    e.preventDefault()
    setProduct(defaultProduct)
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveProduct(product)
    setShowForm(false)
  }

  const editRecord = product => {
    setProduct(product)
    setShowForm(true)
  }

  const updateForm = e => {
    e.preventDefault()
    const newProduct = { ...product, [e.target.id]: e.target.value }
    setProduct(newProduct)
  }

  const cancel = e => {
    e.preventDefault()
    setShowForm(false)
  }

  const deleteRecord = product => {
    deleteProduct(product)
  }

  const { code, name, categoryId, unitId, minimum, price, vat, companyId, statusId } = product

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {products.length && <Table
          title="Products"
          records={products}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Product</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Products" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select className="form-control" id="categoryId" value={categoryId} onChange={e => updateForm(e)}>
              {categories.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="unitId">Unit</label>
            <select className="form-control" id="unitId" value={unitId} onChange={e => updateForm(e)}>
              {units.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="minimum">Minimum</label>
            <input type="number" id="minimum" className="form-control" value={minimum} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="vat">V.A.T.</label>
            <input type="number" id="vat" className="form-control" value={vat} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" className="form-control" value={price} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Company</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">Status</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)}>
              {status.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment >
  )
}

export default Products