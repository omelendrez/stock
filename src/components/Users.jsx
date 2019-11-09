import React, { useState, useEffect, useRef } from 'react'
import { getUsers, saveUser, deleteUser } from './../services/users'
import { getStatus } from './../services/status'
import { getCompanies } from './../services/companies'
import { getProfiles } from './../services/profiles'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'

const Users = () => {
  let timeout = useRef(0)
  const defaultUser = {
    id: null,
    userName: "",
    email: "",
    fullName: "",
    profileId: null,
    companyId: null,
    statusId: null,
  }
  const [users, setUsers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])
  const [companies, setCompanies] = useState([])
  const [profiles, setProfiles] = useState([])
  const [user, setUser] = useState(defaultUser)
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
    const users = await getUsers()
    setUsers(users)
    const status = await getStatus()
    setStatus(status)
    const companies = await getCompanies()
    setCompanies(companies)
    const profiles = await getProfiles()
    setProfiles(profiles)
  }

  const addRecord = e => {
    e.preventDefault()
    setUser(defaultUser)
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveUser(user)
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
    const newUser = { ...user, [e.target.id]: e.target.value }
    setUser(newUser)
  }

  const editRecord = user => {
    setUser(user)
    setShowForm(true)
  }

  const deleteRecord = user => {
    deleteUser(user)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { userName, email, fullName, profileId, companyId, statusId } = user

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        <Table
          title="Users"
          records={users}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}

        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add User</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Users" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="userName">User Name</label>
            <input type="text" id="userName" className="form-control" value={userName} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" className="form-control" value={email} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" className="form-control" value={fullName} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="profileId">Profiles</label>
            <select className="form-control" id="profileId" value={profileId} onChange={e => updateForm(e)} >
              <option></option>
              {profiles.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="companyId">Companies</label>
            <select className="form-control" id="companyId" value={companyId} onChange={e => updateForm(e)} >
              <option></option>
              {companies.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="statusId">Status</label>
            <select className="form-control" id="statusId" value={statusId} onChange={e => updateForm(e)} >
              <option></option>
              {status.map(st => <option key={st.id} value={st.id}>{st.name}</option>)}
            </select>
          </div>

          <Alert response={response} />

        </Form>
      }
    </React.Fragment>
  )
}

export default Users