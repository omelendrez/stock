import React, { Fragment, useState, useEffect } from 'react'
import Header from './Header'

const Table = ({ title, records, editRecord }) => {
  const pagination = {
    curPage: 1,
    pageSize: 5
  }
  const [pageState, setPageState] = useState(pagination)
  const [pageItems, setPageItems] = useState([])

  const setPage = pageId => {
    const newPageState = { ...pageState, curPage: pageId }
    setPageState(newPageState)
  }

  useEffect(() => {
    const { curPage, pageSize } = pageState
    const recordFrom = (curPage - 1) * pageSize
    const recordTo = curPage * pageSize - 1
    const recordsToShow = records.filter(
      (i, index) => index >= recordFrom && index <= recordTo
    )
    setPageItems(recordsToShow)
  }, [pageState])

  return (
    pageItems.length && <div className="table-responsive">
      <Header title={title} />
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            <Headers record={pageItems[0]} />
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          <Body records={pageItems} editRecord={editRecord} />
        </tbody>
      </table>
      <Pagination
        setPage={setPage}
        pageState={pageState}
        records={records.length}
      />

    </div>
  )
}

const Headers = ({ record }) => Object.keys(record).map((field, index) => <th className="text-uppercase" key={index}>{field.replace(/_/g, ' ')}</th>)

const Body = ({ records, editRecord }) => records.map((record, index) => (<tr key={index}><Row record={record} /><Buttons record={record} editRecord={editRecord} /></tr>))

const Row = ({ record }) => Object.keys(record).map((field, index) => <td key={index}>{record[field]}</td>)

const Buttons = ({ record, editRecord }) => (
  <td>
    <button className="btn btn-sm btn-danger mr-3">Delete</button>
    <button className="btn btn-sm btn-primary" onClick={() => editRecord(record)}>Edit</button>
  </td>
)
const Pagination = ({ pageState, records, setPage }) => {
  const { pageSize, curPage } = pageState
  const buttons = [...Array(Math.ceil(records / pageSize)).keys()].map(i => i + 1)
  return (
    buttons.length > 1 && <nav aria-label='...'>
      <ul className='pagination justify-content-center'>
        {buttons.map(i => {
          let itemClass = `page-item ${i === curPage ? "active" : ""}`
          return (
            <li
              key={i}
              className={itemClass}
              aria-current='page'
              onClick={() => setPage(i)}
            >
              <span className='page-link'>{i}</span>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Table
