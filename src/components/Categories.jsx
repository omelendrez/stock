import React, { useState, useEffect } from 'react'
import { getCategories } from './../services/categories'
import Table from './common/Table'

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const categories = getCategories()
        setCategories(categories)
    }, [])

    return (
        categories.length && <Table
            title="categories"
            records={categories}
        />
    )
}

export default Categories