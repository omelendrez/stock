import React, { useState, useEffect } from 'react'
import { getUsers } from './../services/users'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import { getProfiles } from './../services/profiles'
import Table from './common/Table'
import Form from './common/Form'

const Users = () => {
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const users = getUsers()
    setUsers(users)
    const status = getStatus()
    setStatus(status)
    const companies = getCompanies()
    setCompanies(companies)
    const profiles = getProfiles()
    setProfiles(profiles)
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
        {users.length && <Table
          title="Users"
          records={users}
        />}

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Users</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Suppliers" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">User Name</label>
            <input type="text" id="userName" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Email</label>
            <input type="text" id="email" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="fullName" className="form-control" />
          </div>

          <div class="form-group">
            <label for="status">Profiles</label>
            <select className="form-control" id="status">
              {profiles.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div class="form-group">
            <label for="status">Companies</label>
            <select className="form-control" id="status">
              {companies.map(st => <option value={st.id}>{st.name}</option>)}
            </select>
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

export default Users