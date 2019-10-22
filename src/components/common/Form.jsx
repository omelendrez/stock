import React from 'react'
import Header from './Header'

const Form = props => {
  const { title, children, save, cancel } = props
  return (
    <React.Fragment>
      <Header title={`Adding ${title}`} />
      <form className="container mt-3">
        {children}
        <button className="btn btn-primary mr-3" onClick={e => save(e)}>Save</button>
        <button className="btn btn-danger ml-3" onClick={e => cancel(e)}>Cancel</button>
      </form>
    </React.Fragment >
  )
}

export default Form