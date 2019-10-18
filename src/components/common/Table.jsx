import React, { useState, useEffect } from 'react'

const Table = ({ title, records }) => {
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
      <div className="p-2 text-left text-white lead bg-info font-weight-normal">{title}</div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <Header record={pageItems[0]} />
          </tr>
        </thead>
        <tbody>
          <Body records={pageItems} />
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

const Header = ({ record }) => Object.keys(record).map((field, index) => <th className="text-uppercase" key={index}>{field}</th>)

const Body = ({ records }) => records.map((record, index) => (<tr key={index}><Row record={record} /></tr>))

const Row = ({ record }) => Object.keys(record).map((field, index) => <td key={index}>{record[field]}</td>)

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