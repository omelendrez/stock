import React, { useState, useEffect } from 'react'
import { getProducts } from './../services/products'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Products = () => {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])

  useEffect(() => {
    const products = getProducts()
    setProducts(products)
    const status = getStatus()
    setStatus(status)
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
        {products.length && <Table
          title="Products"
          records={products}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Product</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Products" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select className="form-control" id="status">
              {status.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Products