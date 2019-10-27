import React, { useState, useEffect } from 'react'
import { getProfiles } from './../services/profiles'
import { getStatus } from './../services/status'
import Table from './common/Table'
import Form from './common/Form'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState([])

  useEffect(() => {
    const profiles = getProfiles()
    setProfiles(profiles)
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
        {profiles.length && <Table
          title="Profiles"
          records={profiles}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Profile</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Profiles" save={save} cancel={cancel}>

          <div className="form-group">
            <label for="code">Code</label>
            <input type="text" id="code" className="form-control" />
          </div>

          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" className="form-control" />
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Profiles