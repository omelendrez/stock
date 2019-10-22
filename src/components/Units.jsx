import React, { useState, useEffect } from 'react'
import { getUnits } from './../services/units'
import Table from './common/Table'

const Units = () => {
  const [units, setUnits] = useState([])

  useEffect(() => {
    const units = getUnits()
    setUnits(units)
  }, [])

  return (
    units.length && <Table
      title="Units"
      records={units}
    />
  )
}

export default Units