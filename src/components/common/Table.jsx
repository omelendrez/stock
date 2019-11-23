import React, { useState, useEffect } from 'react'
import Header from './Header'
import { hiddenTableFields } from '../../helpers'
import { config } from './../../config'
import { t } from './../../int'
const { language } = config

const editText = t(language, "edit")
const deleteText = t(language, "delete")
const deleteRecordText = t(language, "delete record") + ' ?'

const Table = ({ title, records, editRecord, deleteRecord }) => {
  const pagination = {
    curPage: 1,
    pageSize: 10
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
  }, [records, pageState])

  return (
    <div className="table-responsive">
      <Header title={title} />
      {pageItems.length > 0 && <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            <Headers record={pageItems[0]} />
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          <Body records={pageItems} editRecord={editRecord} deleteRecord={deleteRecord} />
        </tbody>
      </table>}
      <Pagination
        setPage={setPage}
        pageState={pageState}
        records={records.length}
      />

    </div>
  )
}


const Headers = ({ record }) => Object.keys(record).map((field, index) => hiddenTableFields.indexOf(field) !== -1 ? null : <th className="text-uppercase small" key={index}>{field.replace(/_/g, ' ')}</th>)

const Body = ({ records, editRecord, deleteRecord }) => records.map((record, index) => (<tr key={index}><Row record={record} /><Buttons record={record} editRecord={editRecord} deleteRecord={deleteRecord} /></tr>))

const Row = ({ record }) => Object.keys(record).map((field, index) => hiddenTableFields.indexOf(field) !== -1 ? null : <td key={index}>{record[field]}</td>)

const Buttons = ({ record, editRecord, deleteRecord }) => (
  <td>
    <button className="btn btn-sm btn-danger mr-3" onClick={() => window.confirm(deleteRecordText) && deleteRecord(record)}>{deleteText}</button>
    <button className="btn btn-sm btn-primary" onClick={() => editRecord(record)}>{editText}</button>
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
