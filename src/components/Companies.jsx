import React, { useState, useEffect } from 'react'
import { getCompanies } from './../services/companies'
import Table from './common/Table'

const Companies = () => {
    const [companies, setCompanies] = useState([])

    useEffect(() => {
        const companies = getCompanies()
        setCompanies(companies)
    }, [])

    return (
        companies.length && <Table
            title="Companies"
            records={companies}
        />
    )
}

export default Companies