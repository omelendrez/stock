import React, { useState, useEffect } from 'react'
import { getStores } from './../services/stores'
import Table from './common/Table'

const Stores = () => {
  const [stores, setStores] = useState([])

  useEffect(() => {
    const stores = getStores()
    setStores(stores)
  }, [])

  return (
    stores.length && <Table
      title="Stores"
      records={stores}
    />
  )
}

export default Stores
