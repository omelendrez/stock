import React, { useState, useEffect, useRef } from 'react'
import { getProducts, saveProduct, deleteProduct } from './../services/products'
import { getStatus } from './../services/status'
import { getCategories } from './../services/categories'
import { getCompanies } from './../services/companies'
import { getUnits } from './../services/units'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Products = () => {
  let timeout = useRef(0)
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
    const products = await getProducts()
    setProducts(products)
    const categories = await getCategories()
    setCategories(categories)
    const companies = await getCompanies()
    setCompanies(companies)
    const units = await getUnits()
    setUnits(units)

  }

  const addRecord = e => {
    e.preventDefault()
    setProduct(defaultProduct)
    setResponse({})
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveProduct(product)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const editRecord = product => {
    setProduct(product)
    setResponse({})
    setShowForm(true)
  }

  const updateForm = e => {
    e.preventDefault()
    const newProduct = { ...product, [e.target.id]: e.target.value }
    setProduct(newProduct)
  }

  const cancel = e => {
    e.preventDefault()
    setResponse({})
    setShowForm(false)
  }

  const deleteRecord = product => {
    deleteProduct(product)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name, categoryId, unitId, minimum, price, vat, companyId, statusId } = product

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {products.length && <Table
          title={t(language, "products")}
          records={products}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add product")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "products")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")}</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">{t(language, "name")}</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">{t(language, "category")}</label>
            <select className="form-control" id="categoryId" value={categoryId} onChange={e => updateForm(e)}>
              <option></option>
              {categories.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="unitId">{t(language, "unit")}</label>
            <select className="form-control" id="unitId" value={unitId} onChange={e => updateForm(e)}>
              <option></option>
              {units.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="minimum">{t(language, "minimum")}</label>
            <input type="number" id="minimum" className="form-control" value={minimum} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="vat">{t(language, "vat")}</label>
            <input type="number" id="vat" className="form-control" value={vat} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="price">{t(language, "price")}</label>
            <input type="number" id="price" className="form-control" value={price} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">{t(language, "company")}</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)}>
              <option></option>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
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
    </React.Fragment >
  )
}

export default Products