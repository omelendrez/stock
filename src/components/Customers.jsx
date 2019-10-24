import React, { useState, useEffect } from 'react'
import { getCustomers } from './../services/customers'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])

  useEffect(() => {
    const customers = getCustomers()
    setCustomers(customers)
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
        {customers.length && <Table
          title="Customers"
          records={customers}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Customer</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Customers" save={save} cancel={cancel}>

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

export default Customers