import React, { useState, useEffect } from 'react'
import { getCustomers } from './../services/customers'
import Table from './common/Table'

const Customers = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const customers = getCustomers()
        setCustomers(customers)
    }, [])

    return (
        customers.length && <Table
            title="Customers"
            records={customers}
        />
    )
}

export default Customers