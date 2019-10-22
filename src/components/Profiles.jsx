import React, { useState, useEffect } from 'react'
import { getProfiles } from './../services/profiles'
import Table from './common/Table'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const profiles = getProfiles()
    setProfiles(profiles)
  }, [])

  return (
    profiles.length && <Table
      title="Profiles"
      records={profiles}
    />
  )
}

export default Profiles