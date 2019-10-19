import React, { useState, useEffect } from 'react'
import { getSuppliers } from './../services/suppliers'
import Table from './common/Table'

const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        const suppliers = getSuppliers()
        setSuppliers(suppliers)
    }, [])

    return (
        suppliers.length && <Table
            title="Suppliers"
            records={suppliers}
        />
    )
}

export default Suppliers