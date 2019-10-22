import React, { useState, useEffect } from 'react'
import { getProducts } from './../services/products'
import Table from './common/Table'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const products = getProducts()
    setProducts(products)
  }, [])

  return (
    products.length && <Table
      title="Products"
      records={products}
    />
  )
}

export default Products