import React, { useState, useEffect, useRef } from 'react'
import { getProfiles, saveProfile, deleteProfile } from './../services/profiles'
import Table from './common/Table'
import Form from './common/Form'
import Alert from './common/Alert'
import { config } from './../config'
import { t } from './../int'
const { language } = config

const Profiles = () => {
  let timeout = useRef(0)
  const defaultProfile = {
    id: null,
    code: "",
    name: ""
  }
  const [profile, setProfile] = useState(defaultProfile)
  const [profiles, setProfiles] = useState([])
  const [showForm, setShowForm] = useState(false)
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
    const profiles = await getProfiles()
    setProfiles(profiles)
  }

  const addRecord = e => {
    e.preventDefault()
    setProfile(defaultProfile)
    setResponse({})
    setShowForm(true)
  }

  const save = e => {
    e.preventDefault()
    saveProfile(profile)
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
    const newProfile = { ...profile, [e.target.id]: e.target.value }
    setProfile(newProfile)
  }

  const editRecord = profile => {
    setProfile(profile)
    setResponse({})
    setShowForm(true)
  }

  const deleteRecord = profile => {
    deleteProfile(profile)
      .then(data => {
        setResponse(data)
        fetchData()
      })
      .catch(err => setResponse(err.response.data))
  }

  const { code, name } = profile

  return (
    <React.Fragment>
      {!showForm && <React.Fragment>
        {profiles.length && <Table
          title={t(language, "profiles")}
          records={profiles}
          editRecord={editRecord}
          deleteRecord={deleteRecord}
        />}
        <Alert response={response} />

        <button className="btn btn-primary m-2" onClick={e => addRecord(e)}>{t(language, "add profile")}</button>
      </React.Fragment>}
      {showForm &&
        <Form title={t(language, "profiles")} save={save} cancel={cancel}>

          <div className="form-group">
            <label htmlFor="code">{t(language, "code")}</label>
            <input type="text" id="code" className="form-control" value={code} onChange={e => updateForm(e)} />
          </div>

          <div className="form-group">
            <label htmlFor="name">{t(language, "name")}</label>
            <input type="text" id="name" className="form-control" value={name} onChange={e => updateForm(e)} />
          </div>

          <Alert response={response} />

        </Form>
      }
    </React.Fragment>
  )
}

export default Profiles