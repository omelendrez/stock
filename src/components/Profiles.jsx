import React, { useState, useEffect } from 'react'
import { getProfiles, saveProfile, deleteProfile } from './../services/profiles'
import Table from './common/Table'
import Form from './common/Form'

const Profiles = () => {
  const defaultProfile = {
    id: -1,
    code: "",
    name: ""
  }
  const [profile, setProfile] = useState(defaultProfile)
  const [profiles, setProfiles] = useState([])
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    const profiles = getProfiles()
    setProfiles(profiles)
  }, [])

  const addRecord = e => {
    e.preventDefault()
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveProfile(profile)
    setProfile(defaultProfile)
    setShowForm(false)
  }

  const cancel = e => {
    e.preventDefault()
    setProfile(defaultProfile)
    setShowForm(false)
  }

  const updateForm = e => {
    e.preventDefault()
    const newProfile = { ...profile, [e.target.id]: e.target.value }
    setProfile(newProfile)
  }

  const editRecord = profile => {
    setProfile(profile)
    setShowForm(true)
  }

  const deleteRecord = profile => {
    deleteProfile(profile)
  }

  const { code, name } = profile

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {profiles.length && <Table
          title="Profiles"
          records={profiles}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>Add Profile</button>
      </React.Fragment>}
      {showForm &&
        <Form title="Profiles" save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">Code</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

        </Form>
      }
    </React.Fragment>
  )
}

export default Profiles